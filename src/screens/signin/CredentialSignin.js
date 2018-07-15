import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {Container,Input, Toast} from "native-base";
import {StyleSheet, View} from "react-native";
import {Item} from "native-base";
import {CredentialAuthentication} from "../../api/authentication"
import {withContext} from "../../context/withContext";
import ClickButton from "../../components/ClickButton";



const TextInput = ({text, onChange, value, ...rest}) => (
    <View style={styles.textInput}>
        <Item regular>
            <Input placeholder={text} onChange={onChange} value={value} {...rest}/>
        </Item>
    </View>
);

class CredentialSignin extends React.Component {

    static propTypes = {

    };

    state = {
        email: "",
        password: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    }

    static navigationOptions = () => {
        return ({
            title: 'Sign in',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    handleSigin = async () => {
        const {email, password} = this.state;
        try {
            const auth = await CredentialAuthentication.signin({email, password})
        } catch (e) {

            console.log(e.code)

            let message = "Incorrect Email or Password"
            if (e.code === "auth/invalid-email"){
                message = "Incorrect email format"
            }

            Toast.show({
                text: message,
                buttonText: "Okay",
                type: "warning",
                duration: 3500
            })

        }
    };

    render(){
        const {email, password} = this.state;
        return (
            <Container style={{paddingTop: "20%"}}>
                <TextInput text={"Email"} onChange={this.handleStateChange("email")} value={email} />
                <TextInput text={"Password"} onChange={this.handleStateChange("password")} value={password} secureTextEntry={true} />
                <Container style={styles.buttonContainer}>
                    <ClickButton rounded onPress={this.handleSigin}>Signin</ClickButton>
                </Container>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    form: {
        paddingTop: '15%'

    },
    textInput: {
        marginBottom: "2%",
        marginLeft: "0%",
        backgroundColor: "white"
    },
    container: {
        paddingLeft: "10%",
        paddingRight: "10%"
    },
    buttonContainer: {
        paddingLeft: "10%",
        paddingRight: "10%"
    }

});

export default hoistStatics(compose(withContext)) (CredentialSignin)
