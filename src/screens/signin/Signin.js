import React from 'react';
import {Alert, Text, View, StyleSheet} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ClickButton} from '../../components'
import {FacebookAuthentication} from '../../api/authentication'
import IonIcons from 'react-native-vector-icons/Ionicons'

import compose from 'recompose/compose'
import hoistStatics from "recompose/hoistStatics";
import {withContext} from "../../context/withContext";
import {Body, Container, Left, Toast, Icon} from "native-base";

const FacebookLoginButton = ({children, ...rest}) => (
    <FontAwesome.Button name="facebook" backgroundColor="#3b5998" {...rest}>
        <Text color={"white"}>{children}</Text>
    </FontAwesome.Button>
);

const SpanTextButton = ({children, icon, font, fonttype, iconSize=30,...rest}) => (
    <ClickButton {...rest}>

        {
            icon && iconSize && (
                <Icon name={icon} type={fonttype} style={{color: "white"}} color="white" size={iconSize} />
            )
        }
        <Text>{children}</Text>


    </ClickButton>
);

class Signin extends React.Component {


    facebookAuth = async () => {
        try {
            const currentUser = await FacebookAuthentication.facebookLogin();
        } catch (e) {
            if (e.code === "auth/account-exists-with-different-credential")
                Toast.show({
                    text: "Please login using email authentication",
                    buttonText: "Okay",
                    type: "danger"
                })

        }
    };

    render() {
        return (
            <Container>
                <Container style={[styles.container, styles.button]}>
                    <SpanTextButton
                        rounded
                        onPress={() => this.props.navigation.navigate("CredentialSignin")}
                    >
                        Sign in
                    </SpanTextButton>
                    <SpanTextButton
                        rounded
                        onPress={() => this.props.navigation.navigate("Signup")}
                    >
                        Sign up
                    </SpanTextButton>
                    <SpanTextButton
                        rounded
                        onPress={() => this.props.navigation.navigate("ForgotPassword")}
                    >
                        Forgot Password?
                    </SpanTextButton>
                </Container>

                {/*<View style={{flexDirection: 'row', paddingLeft: "8%",paddingRight: "8%"}}>*/}
                    {/*<View style={{backgroundColor: 'grey', height: 2, flex: 1, alignSelf: 'center'}} />*/}
                    {/*<Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 24 }}>OR</Text>*/}
                    {/*<View style={{backgroundColor: 'grey', height: 2, flex: 1, alignSelf: 'center'}} />*/}
                {/*</View>*/}
                {/*<Container style={[styles.button]} >*/}
                    {/*<SpanTextButton*/}
                        {/*rounded*/}
                        {/*onPress={this.facebookAuth}*/}
                        {/*fonttype={"FontAwesome"}*/}
                        {/*icon={"facebook"}>*/}
                        {/*{"   Login with Facebook"}*/}
                    {/*</SpanTextButton>*/}
                {/*</Container>*/}
            </Container>



        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
    },
    button: {
        marginLeft: "15%",
        marginRight: "15%"
    }

})

export default hoistStatics(compose(withContext)) (Signin)