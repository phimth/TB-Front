import firebase from 'firebase'
import functions from 'firebase-functions'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const db = firebase.firestore()
export const auth = firebase.auth()
export const data = firebase.database()

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
// export const onUserStatusChanged = functions.database
//   .ref('/status/bdggBwSJnPNbeyJavK4w5A1tUxR2')
//   .onUpdate(async (change, context) => {
//     // Get the data written to Realtime Database
//     const eventStatus = change.after.val()

//     // Then use other event data to create a reference to the
//     // corresponding Firestore document.
//     const userStatusFirestoreRef = db.doc(`status/${context.params.uid}`)

//     // It is likely that the Realtime Database change that triggered
//     // this event has already been overwritten by a fast change in
//     // online / offline status, so we'll re-read the current data
//     // and compare the timestamps.
//     const statusSnapshot = await change.after.ref.once('value')
//     const status = statusSnapshot.val()
//     console.log(status, eventStatus)
//     // If the current timestamp for this data is newer than
//     // the data that triggered this event, we exit this function.
//     if (status.last_changed > eventStatus.last_changed) {
//       return null
//     }

//     // Otherwise, we convert the last_changed field to a Date
//     eventStatus.last_changed = new Date(eventStatus.last_changed)

//     // ... and write it to Firestore.
//     return userStatusFirestoreRef.set(eventStatus)
//   })
