import Firebase from 'firebase'
import 'firebase/firestore'

let config = {
	apiKey: "AIzaSyCjhHd2plnJniM-Q52Ixzg-m5iPjZkj8j8",
    authDomain: "psuc-2d75e.firebaseapp.com",
    databaseURL: "https://psuc-2d75e.firebaseio.com",
    projectId: "psuc-2d75e",
    storageBucket: "psuc-2d75e.appspot.com",
    messagingSenderId: "268554209735"
}

let firebaseApp = Firebase.initializeApp(config)
const firestore = firebaseApp.firestore()

firestore.settings({
	timestampsInSnapshots: true
})

export default firestore