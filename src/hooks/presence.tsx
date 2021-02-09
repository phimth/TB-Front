import firebase from 'firebase'

const Presence = (id: string) => {
  const userStatusDatabaseRef = firebase.database().ref('/status/' + id)
  const userStatusFirestoreRef = firebase.firestore().doc('/status/' + id)
  const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }

  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }
  const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  }

  const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  }
  //console.log('hi')
  firebase
    .database()
    .ref('.info/connected')
    .on('value', function (snapshot) {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        userStatusFirestoreRef.set(isOfflineForFirestore)
        return
      }
      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function () {
          userStatusDatabaseRef.set(isOnlineForDatabase)
          userStatusFirestoreRef.set(isOnlineForFirestore)
        })
    })
}

export default Presence
