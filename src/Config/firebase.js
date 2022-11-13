import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const config = {

    apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_URL,
    projectId: process.env.REACT_APP_FB_PROJECT,
    storageBucket: process.env.REACT_APP_FB_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDER,
    appId: process.env.REACT_APP_FB_APP,
    measurementId: process.env.REACT_APP_FB_ID,
}

firebase.initializeApp(config)

firebase.auth = firebase.auth()

firebase.db = firebase.firestore()

export default firebase