import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import {Container, Toast} from "native-base";
import {FacebookAuthentication, CredentialAuthentication} from '../../api/authentication/index'
import {
    ClickButton
} from '../../components/index'
import {
    Alert, StyleSheet, Text, TouchableOpacity
} from 'react-native'

// TODO: Fix proxy component problem
class AccountManagement extends React.Component {

    logout = async () => {
        const {authProvider} = this.props.context;
        switch (authProvider){
            case "password":
                await CredentialAuthentication.signout();
                break;

            case "facebook.com":
                await FacebookAuthentication.facebookLogout();
                break;
        }
    };

    changeEmail = () => {
        // TODO: relogin requires
        const {authProvider} = this.props.context;
        if (authProvider !== "password") {
            Alert.alert(
                'Operation not permitted',
                `SSO cannot change email`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            );
            return;
        }
        this.props.navigation.navigate("ChangeEmail");
    };

    changePassword = () => {
        // TODO: relogin requires

        const {authProvider} = this.props.context;
        if (authProvider !== "password") {
            Alert.alert(
                'Operation not permitted',
                `SSO cannot change password`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            );
            return;
        }
        this.props.navigation.navigate("ChangePassword");
    };

    showToast = ({text, duration=3500, type="success", buttonText="Okey"}) => {
        Toast.show({
            text,
            duration,
            type,
            buttonText
        });
    }

    sendVerificationEmail = async () => {
        try {
            const verify = await CredentialAuthentication.sendEmailVerification()
            this.showToast({
                text: "Verification email send"
            })
        } catch (e) {
            if (e.code !== null || e.code !== undefined){
                this.showToast({
                    text: e.message,
                    type: "warning"
                })
            } else {
                this.showToast({
                    text: "There was a problem sending verification email",
                    type: "warning"
                })
            }
        }
    };

    editProfile = (uid) => () => {
        alert(`My UID: ${uid}`)
    }

    render(){
        const {authProvider, emailVerified, role, currentUser} = this.props.context
        return (
            <Container style={styles.container}>
                {
                    authProvider === "password" && !emailVerified && (<ClickButton warning rounded onPress={this.sendVerificationEmail}>Resent Confirmation Email</ClickButton>)
                }
                {
                    role === "employer" && (
                        <ClickButton rounded onPress={this.editProfile(currentUser.uid)}>Edit Profile</ClickButton>
                    )
                }
                {
                    authProvider === "password" && (
                        <ClickButton rounded onPress={this.changeEmail}>Change Email</ClickButton>
                    )
                }
                {
                    authProvider === "password" && (
                        <ClickButton rounded onPress={this.changePassword}>Change Password</ClickButton>
                    )
                }
                <ClickButton rounded danger onPress={this.logout}>Logout</ClickButton>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        paddingTop: "4%"
    },

})

export default hoistStatics(compose(withContext)) (AccountManagement)