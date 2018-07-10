import React from 'react';
import {Text, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ClickButton} from '../../components'
import {FacebookAuthentication} from '../../api/authentication'
import IonIcons from 'react-native-vector-icons/Ionicons'

import compose from 'recompose/compose'
import hoistStatics from "recompose/hoistStatics";
import {withContext} from "../../context/withContext";

const FacebookLoginButton = ({children, ...rest}) => (
    <FontAwesome.Button name="facebook" backgroundColor="#3b5998" {...rest}>
        <Text color={"white"}>{children}</Text>
    </FontAwesome.Button>
);

const SpanTextButton = ({children, ...rest}) => (
    <ClickButton {...rest}>
        <Text>{children}</Text>
    </ClickButton>
);

class Signin extends React.Component {


    facebookAuth = async () => {
        try {
            const currentUser = await FacebookAuthentication.facebookLogin();
            this.props.setContext({
                currentUser
            })
        } catch (e) {
            // TODO: Handle error
            console.error(e)
        }
    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Abcdefg',
            headerLeft: (
                <IonIcons.Button name="ios-arrow-back" backgroundColor="transparent" color={"black"} onPress={() => navigation.pop()} />
            ),
        })

    };

    render() {
        return (
            <View>
                <SpanTextButton onPress={() => alert("sign up pressed")}>Sign up</SpanTextButton>
                <SpanTextButton onPress={() => this.props.navigation.navigate("CredentialSignin")}>Sign in</SpanTextButton>
                <FacebookLoginButton onPress={this.facebookAuth}>Login with Facebook</FacebookLoginButton>
            </View>
        )
    }
}

export default hoistStatics(compose(withContext)) (Signin)