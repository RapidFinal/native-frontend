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

const reauthenticate = (currentPassword) => {
    const user = RNFirebase.auth().currentUser;
    const cred = RNFirebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
}

export const changepassword = async ({password, newPassword, confirmPassword}) => {
    if (newPassword !== confirmPassword){
        throw new Error("Password and confirm password do not match")
    }
    return reauthenticate(password)
        .then(() => RNFirebase.auth().currentUser)
        .then((user) => user.updatePassword(newPassword))
}

export const changeemail = async ({password, newEmail, confirmEmail}) => {
    if (newEmail !== confirmEmail){
        throw new Error("New email and confirm email do not match")
    }

    return reauthenticate(password)
        .then(() => RNFirebase.auth().currentUser)
        .then((user) => user.updateEmail(newEmail))

}

export const forgotpassword = async ({email}) => {
    return RNFirebase.auth().sendPasswordResetEmail(email)
}