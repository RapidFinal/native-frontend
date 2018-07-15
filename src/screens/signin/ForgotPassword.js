import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import {Alert} from 'react-native'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Content, Form, Input, Spinner, Text, View} from "native-base";
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

    handleClick = async () => {
        const {email} = this.state
        try {
            CredentialAuthentication.forgotPassword({email})
                .then(() => {
                    Alert.alert(
                        'Success',
                        `Password reset email has been sent to ${email}`,
                        [
                            {text: 'OK'},
                        ],
                        { cancelable: false }
                    )
                })
        } catch (e) {
            Alert.alert(
                'Failure',
                `There was an error`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            )
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
