import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import {Container} from "native-base";
import {FacebookAuthentication, CredentialAuthentication} from '../../api/authentication/index'
import {
    ClickButton
} from '../../components/index'
import {Alert} from 'react-native'
import RNFirebase from 'react-native-firebase'


// TODO: Fix proxy component problem
class AccountManagement extends React.Component {

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Account Management',
            headerLeft: (
                <IonIcons.Button name="ios-arrow-back"
                                 backgroundColor="transparent"
                                 color={"black"}
                                 onPress={() => navigation.pop()} />
            ),
            headerRight: (
                null
            )
        })
    }

    logout = () => {
        const {authProvider} = this.props.context;
        switch (authProvider){
            case "password":
                CredentialAuthentication.signout();
                break;

            case "facebook.com":
                FacebookAuthentication.facebookLogout();
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

    sendVerificationEmail = () => {
        CredentialAuthentication.sendEmailVerification().then(() => {
            console.log("Auth Email Sent")
        })
    }

    render(){
        const {authProvider, emailVerified} = this.props.context
        return (
            <Container>
                {
                    authProvider === "password" && !emailVerified && (<ClickButton onPress={this.sendVerificationEmail}>Resent Confirmation Email</ClickButton>)
                }
                <ClickButton onPress={this.changeEmail}>Change Email</ClickButton>
                <ClickButton onPress={this.changePassword}>Change Password</ClickButton>
                <ClickButton onPress={this.logout}>Logout</ClickButton>
            </Container>
        )
    }
}

export default hoistStatics(compose(withContext)) (AccountManagement)