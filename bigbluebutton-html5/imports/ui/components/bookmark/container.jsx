import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import Auth from '/imports/ui/services/auth';
import BookmarkComponent from './component';
import Modal from '/imports/ui/components/modal/simple/component';


const BookmarkContainer = props => <BookmarkComponent {...props} />;

export default withTracker(() => {

  return ({
    // sendBookmark: (title) => {
    //   alert('title', title);
    //   // alert('Bookmark made', Auth.meetingID);
      
    //   window.fetch('https://www.missingoffice.net/gd/conference/bookmark?id=' + Auth.meetingID)
    //     .then(function (response) 
    //     {
    //       console.log(response.json());
    //     })
    //     .then(function (data) 
    //     {
    //       alert("bookmarked");
    //     });

    //   // makeCall('toggleBookmark');
    //   // mountModal(null);
    // },

    // isMeteorConnected: Meteor.status().connected,

  });
})(BookmarkContainer);
