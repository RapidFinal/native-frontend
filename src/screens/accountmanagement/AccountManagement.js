import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import {Container} from "native-base";
import {FacebookAuthentication, CredentialAuthentication} from '../../api/authentication/index'
import {
    ClickButton
} from '../../components/index'
import {
    Alert, StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation';


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
        this.props.navigation.navigate("Auth");
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
            <Container style={styles.container}>
                {
                    authProvider === "password" && !emailVerified && (<ClickButton onPress={this.sendVerificationEmail}>Resent Confirmation Email</ClickButton>)
                }
                <ClickButton onPress={this.changeEmail}>Change Email</ClickButton>
                <ClickButton onPress={this.changePassword}>Change Password</ClickButton>
                <ClickButton danger onPress={this.logout}>Logout</ClickButton>
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

export default hoistStatics(compose(withContext)) (withNavigation(AccountManagement))