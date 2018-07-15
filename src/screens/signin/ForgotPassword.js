import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import {Alert, View} from 'react-native'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Input, Toast, View} from "native-base";
import {Item} from "native-base";
import {CredentialAuthentication} from "../../api/authentication"
import IonIcons from 'react-native-vector-icons/Ionicons'
import {withContext} from "../../context/withContext";
import ClickButton from "../../components/ClickButton";

const TextInput = ({text, onChange, value, ...rest}) => (
    <View style={styles.textInput}>
        <Item regular>
            <Input placeholder={text} onChange={onChange} value={value} {...rest}/>
        </Item>
    </View>
);

class ForgotPassword extends React.Component {

    static propTypes = {

    };

    state = {
        email: "",
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Forgot Password',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    handleClick = async () => {
        const {email} = this.state;
        try {
            const send = await CredentialAuthentication.forgotPassword({email})
            Toast.show({
                text: "Password reset email has been sent!",
                buttonText: "Okay",
                type: "success",
                duration: 3500
            })

        } catch (e) {

            let message = "Password reset email has been sent!"
            let type = "success"
            if (e.code === "auth/invalid-email"){
                message = "Incorrect email format"
                type = "warning"
            }

            Toast.show({
                text: message,
                buttonText: "Okay",
                type: type,
                duration: 3500
            })
            console.log(e)
        }
    }

    render(){
        const {email} = this.state;
        return (
            <Container style={{paddingTop: "20%"}}>
                <TextInput text={"E-Mail"} onChange={this.handleStateChange("email")} value={email} />
                <Container style={styles.buttonContainer}>
                    <ClickButton rounded onPress={this.handleClick}>Sent Password Reset Email</ClickButton>
                </Container>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    form: {

    },
    textInput: {
        marginBottom: "2%",
        marginLeft: "0%",
        backgroundColor: "white"
    },
    buttonContainer: {
        paddingLeft: "10%",
        paddingRight: "10%"
    }

});

export default hoistStatics(compose(withContext)) (ForgotPassword)
