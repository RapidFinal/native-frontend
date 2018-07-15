import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {StyleSheet, Alert} from "react-native";
import {Container,Input, View, Toast} from "native-base";
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

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Signin',
            headerLeft: (
                <IonIcons.Button
                    name="ios-arrow-back"
                    backgroundColor="transparent"
                    color={"black"}
                    onPress={() => navigation.pop()}
                />
            ),
            headerRight: (
                null
            )
        })
    };

    handleSigin = async () => {
        const {email, password} = this.state;
        try {
            const auth = await CredentialAuthentication.signin({email, password})
            if (auth !== null){
                this.props.navigation.navigate("MainEmployer")
            }
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
                <TextInput text={"EMail"} onChange={this.handleStateChange("email")} value={email} />
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
