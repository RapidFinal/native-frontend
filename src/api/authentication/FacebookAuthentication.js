import { AccessToken, LoginManager,  } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'


export const facebookLogin = async (permissions=['public_profile', 'email']) => {
    const result = await LoginManager.logInWithReadPermissions(permissions);

    console.log('res:',result);
    if (result.isCancelled) {
        throw new Error('User cancelled request');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
};

export const facebookLogout = async () => {
    LoginManager.logOut();
    return firebase.auth().signOut();
};
