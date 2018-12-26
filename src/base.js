// pour stocker, faire le lien entre firebase et notre application.
import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'


const firebaseApp = firebase.initializeApp({ // initialiser l'application.
    apiKey: "AIzaSyD_XBU3M6kyPhcchMtdx5C7EI2h4UkwERQ", // en clair sur le front-end
    authDomain: "chatbox-app-7fe4f.firebaseapp.com", // adresse de la base de données pour qu'il puisse savoir ou  connecter.
    databaseURL: "https://chatbox-app-7fe4f.firebaseio.com"
})


const base = Rebase.createClass(firebase.database()) // pour gerer toute la base de données.

export { firebaseApp }  // initialisation de l'application.

export default base

