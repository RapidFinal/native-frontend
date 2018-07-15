import * as CredentialAuthentication from './CredentialAuthentication'
import * as FacebookAuthentication from './FacebookAuthentication'
import firebase from 'react-native-firebase'

export const onAuthStateChanged = (cb) => {
    return firebase.auth().onAuthStateChanged(cb);
};

export const currentUser = () => {
    return firebase.auth().currentUser;
};

export {
    CredentialAuthentication,
    FacebookAuthentication
}