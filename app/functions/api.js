import firebase from "../config/firebase";

const database = firebase.database();

//Create the user object in realtime database
export function getData (route, callback) {
    database.ref('route').child(route).once('value')
        .then(function(snapshot) {
          const exists = (snapshot.val() !== null) ;
          if (exists) route = snapshot.val();
          const data = {exists, route}
          callback(true, data, null);
        })
        .catch((error) => callback(false, null, {message: error}));
}
