import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet} from "react-native";
import {Button, Container, Text} from "native-base";
import {
    NextButton,
    SignUpForm,
    Stepper,
    TextInputWithLabel
} from "../../components";
import {withContext} from "../../context/withContext";
import {CredentialAuthentication} from "../../api/authentication"

// To set context:
// this.props.setContext({authenticated: false});
// To get context state:
// this.props.context.authenticated

class CredentialSignUp extends React.Component {

    static propTypes = {

    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.nativeEvent.text,
        });
    };

    attemptSignUp = async () => {

        const {
            confirmPassword,
            firstName,
            email,
            lastName,
            password
        } = this.state;
        const {navigation, context} = this.props;
        Object.keys(this.state).forEach(key => {
            if (this.state[key] === '') {
                console.log("bad")
            }
        });
        if (confirmPassword !== password) {
            console.log("Bad")
        }
        else if (password.length < 6) {
            console.log("Bad")
        }
        else {
            console.log("pass");
            try {
                const signup = await CredentialAuthentication.signup({email, password})
                const employee = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
                this.props.setContext({employee: employee})
                navigation.navigate("categorySelect")
            } catch (e) {
                console.log(e.code)
            }
        }
    };


    render(){
        const {firstName, lastName, email, password, confirmPassword} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Stepper
                    currentPosition={0}
                    stepCount={4}
                />
                <ScrollView>
                    <SignUpForm>
                        <TextInputWithLabel
                            label="First name"
                            placeholder="First name"
                            value={firstName}
                            onChange={this.handleChange("firstName")}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            value={lastName}
                            onChange={this.handleChange("lastName")}
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange("email")}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={this.handleChange("password")}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={this.handleChange("confirmPassword")}
                        />
                        <NextButton
                            onPress={this.attemptSignUp}
                        />
                    </SignUpForm>
                </ScrollView>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose(withContext) (CredentialSignUp)
