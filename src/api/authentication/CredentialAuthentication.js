import RNFirebase from 'react-native-firebase'

export const signin = async ({ email, password }) => {
    return RNFirebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
}


export const signout = async () => {
    return RNFirebase.auth().signOut();
};

export const signup = async ({email, password}) => {
    return RNFirebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password);
};