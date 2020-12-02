import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Button from '/imports/ui/components/button/component';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';
import TextareaAutosize from 'react-autosize-textarea';
import Auth from '/imports/ui/services/auth';

const intlMessages = defineMessages({
  yesLabel: {
    id: 'app.audioModal.yes',
    description: 'label for yes button',
  },
  noLabel: {
    id: 'app.audioModal.no',
    description: 'label for no button',
  },
});


const propTypes = {
  intl: intlShape.isRequired, 
  closeModal: PropTypes.func.isRequired,
  sendBookmark: PropTypes.func.isRequired,
  amIModerator: PropTypes.bool,  
  mountModal: PropTypes.func.isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
};

const defaultProps = {
  amIModerator: false,
};

class BookmarkComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: null,
      toggle: false,
      hasErrors: false,
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageKeyDown = this.handleMessageKeyDown.bind(this);
  }

  sendBookmark() {
      // alert('Bookmark made', Auth.meetingID);
      
      let url = 'https://www.learnspeed.com/gd/conference/bookmark?id=' + Auth.meetingID;
      url = url + '&title=' + encodeURIComponent(this.state.message);
      console.log('title', url);
      window.fetch(url)
        .then(function (response) 
        {
          console.log(response.json());
        })
        .then(function (data) 
        {
          // alert("bookmarked");
        });

      this.setState({toggle: !this.state.toggle});

      // display = mod;
      this.forceUpdate();

      // makeCall('toggleBookmark');
      // mountModal(null);
  }

  handleMessageKeyDown(e) {
    // TODO Prevent send message pressing enter on mobile and/or virtual keyboard
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();

      // const event = new Event('submit', {
      //   bubbles: true,
      //   cancelable: true,
      // });

      // this.form.dispatchEvent(event);
    }
  }

  handleMessageChange(e) {
    const {
      intl,
      startUserTyping,
      maxMessageLength,
      chatId,
    } = this.props;

    const message = e.target.value;
    let error = null;

    // if (message.length > maxMessageLength) {
    //   error = intl.formatMessage(
    //     messages.errorMaxMessageLength,
    //     { 0: message.length - maxMessageLength },
    //   );

    const handleUserTyping = () => {
      if (error) return;
      // startUserTyping(chatId);
    };

    this.setState({
      message,
      error,
    }, handleUserTyping);

    }

  render() {  
    const {
      amIModerator,
      closeModal,
      sendBookmark,
      isMeteorConnected,
    } = this.props;

    const { hasErrors, error, message } = this.state;

    let title = 'Set Session Mark';
    let joinIcon = 'checkmark';

    const toggleMark = () => {
      this.setState({toggle: !this.state.toggle});
      // this.forceUpdate();
      };

    const closeMod = () => {
      this.setState({toggle: !this.state.toggle});
      // this.forceUpdate();
      };

    let t = this;

    let mod = (
        <Modal
          overlayClassName={styles.overlay}
          className={styles.modal}
          onRequestClose={closeMod}
          hideBorder
          contentLabel={title}
        >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              {title}
            </div>
          </div>

          <TextareaAutosize
            className={styles.input}
            id="message-input"
            innerRef={(ref) => { this.textarea = ref; return this.textarea; }}
            placeholder='title'
            aria-controls='chat'
            aria-label='title'
            autoCorrect="off"
            autoComplete="off"
            spellCheck="true"
            value={message}
            onChange={this.handleMessageChange}
            onKeyDown={this.handleMessageKeyDown}
          />

          <div className={styles.description}>
            <Button
              className={styles.btn}
              onClick={t.sendBookmark.bind(t)}
              disabled={false}
              aria-label='bookmark'
              label='Set'
              color='primary'
              size="lg"
            />
            <Button
              className={styles.btn}
              onClick={closeMod}
              disabled={false}
              aria-label='bookmark'
              label='Cancel'
              color='primary'
              size="lg"
            />
         </div>
       </div>
      </Modal>
           );

    if (!amIModerator) return null;
    // return null;

    let showButton = (            
          <Button
            color="primary"
            className={styles.button}
            icon={joinIcon}
            size="lg"
            circle
            onClick={toggleMark}
          />
    );

    let display = showButton;
    if(this.state.toggle)
      display = mod;

    return (
      <div>
      {display}           
      </div>
    );
  }
}

BookmarkComponent.propTypes = propTypes;
BookmarkComponent.defaultProps = defaultProps;

export default injectIntl(BookmarkComponent);
