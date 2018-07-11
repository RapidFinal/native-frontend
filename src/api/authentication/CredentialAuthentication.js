import RNFirebase from 'react-native-firebase'

export const signin = async ({ email, password }) => {
    return RNFirebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
}


export const signout = async () => {
    return RNFirebase.auth().signOut();
};