import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {Alert, StyleSheet, View} from "react-native";
import {Container, Content, Form, Input, Toast} from "native-base";
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

class ChangeEmail extends React.Component {

    static propTypes = {

    };

    state = {
        password: "",
        newPassword: "",
        confirmPassword: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Change Password',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    showToast = ({text, duration=3500, type="success", buttonText="Okey"}) => {
        Toast.show({
            text,
            duration,
            type,
            buttonText
        });
    }

    handleClick = async () => {
        const {password, confirmPassword, newPassword} = this.state
        try {
            const success = await CredentialAuthentication.changePassword({password, confirmPassword, newPassword})

            this.showToast({
                text: "Password has been updated"
            })

        } catch (e) {

            if (e.code === undefined && e.message !== null){
                this.showToast({
                    text: e.message,
                    type: "warning",
                });
            }else if (e.code === "auth/wrong-password") {
                this.showToast({
                    text: e.message,
                    type: "warning",
                });

            } else {
                this.showToast({
                    text: "There was an error updating password",
                    type: "warning"
                })
            }

            console.log(e.code)
            console.log(e.message)
        }
    }

    render(){
        const {password, newPassword, confirmPassword} = this.state;
        return (
            <Container style={{paddingTop: "20%"}}>
                <TextInput text={"New Password"} onChange={this.handleStateChange("newPassword")} value={newPassword} secureTextEntry={true} />
                <TextInput text={"Confirm Password"} onChange={this.handleStateChange("confirmPassword")} value={confirmPassword} secureTextEntry={true} />
                <TextInput text={"Current Password"} onChange={this.handleStateChange("password")} value={password} secureTextEntry={true} />
                <Container style={styles.buttonContainer}>
                    <ClickButton rounded onPress={this.handleClick}>Change Password</ClickButton>
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

export default hoistStatics(compose(withContext)) (ChangeEmail)
