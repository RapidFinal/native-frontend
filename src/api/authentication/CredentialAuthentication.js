import RNFirebase from 'react-native-firebase'
import _ from 'lodash'

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

export const changePassword = async ({password, newPassword, confirmPassword}) => {
    if (!_.isEmpty(password.trim()) && !_.isEmpty(newPassword.trim())){
        throw new Error("New password or confirm password is empty")
    }

    if (newPassword !== confirmPassword){
        throw new Error("Password and confirm password do not match")
    }
    return reauthenticate(password)
        .then(() => RNFirebase.auth().currentUser)
        .then((user) => user.updatePassword(newPassword))
}

export const changeEmail = async ({password, newEmail, confirmEmail}) => {

    if (!_.isEmpty(newEmail.trim()) && !_.isEmpty(confirmEmail.trim())){
        throw new Error("New email or confirm email is empty")
    }

    if (newEmail !== confirmEmail){
        throw new Error("New email and confirm email do not match")
    }

    return reauthenticate(password)
        .then(() => RNFirebase.auth().currentUser)
        .then((user) => user.updateEmail(newEmail))

}

export const forgotPassword = async ({email}) => {
    return RNFirebase.auth().sendPasswordResetEmail(email)
}

export const sendEmailVerification = async () => {
    return RNFirebase.auth().currentUser.sendEmailVerification()

}

export const fetchSignInMethodsForEmail = async ({email}) => {
    return RNFirebase.auth().fetchSignInMethodsForEmail(email)
}