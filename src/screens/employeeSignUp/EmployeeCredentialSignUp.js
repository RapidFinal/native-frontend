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

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class EmployeeCredentialSignUp extends React.Component {

    static propTypes = {

    }

    state = {
        credential: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        error: {
            errorFirstName: false,
            errorLastName: false,
            errorEmail: false,
            errorPassword: false,
            errorConfirmPassword: false,
            errorMessageFirstName: "Required",
            errorMessageLastName: "Required",
            errorMessageEmail: "Required",
            errorMessagePassword: "Required",
            errorMessageConfirmPassword: "Required",
        }
    };

    handleChange = (name) => (event) => {
        const {credential} = this.state;
        credential[name] = event.nativeEvent.text;
        this.setState({credential});
    };

    setError = (errorField, message) => {
        const {error} = this.state;
        const capErrorField = String(errorField).capitalize();
        const errorKey = "error".concat(capErrorField)
        if (message !== null) {
            error[errorKey] = true
            const errorMessage = "errorMessage".concat(capErrorField)
            error[errorMessage] = message
            this.setState({error})
        }
        else {
            error[errorKey] = false
            this.setError({error})
        }
    };

    validate = (errorField) => {
        const {password, confirmPassword} = this.state.credential;
        const {credential} = this.state;
        if (credential[errorField] === '') {
            this.setError(errorField, "Required")
        }
        else if (errorField === 'password' && password.length < 6) {
            this.setError(errorField, "Password minimum length is 6")
        }
        else if (errorField === 'confirmPassword' && password !== confirmPassword) {
            this.setError(errorField, "Confirm password doesn't match")
        }
        else {
            this.setError(errorField, null)
        }
    };

    attemptSignUp = async () => {
        const {
            firstName,
            email,
            lastName,
            password
        } = this.state.credential;

        const {navigation, context} = this.props;

        try {
            const signup = await CredentialAuthentication.signup({email, password})
            const employee = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            this.props.setContext({employee: employee})
            navigation.navigate("employeeCategorySelect")
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                this.setError("email", "Email is not valid")
            }
            else if (error.code === "auth/email-already-in-use") {
                this.setError("email", "Email already in use")
            }
        }
    };

    render(){
        const {firstName, lastName, email, password, confirmPassword} = this.state.credential; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {
            errorFirstName,
            errorLastName,
            errorEmail,
            errorPassword,
            errorConfirmPassword,
            errorMessageFirstName,
            errorMessageLastName,
            errorMessageEmail,
            errorMessagePassword,
            errorMessageConfirmPassword,
        } = this.state.error;
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
                            hasError={errorFirstName}
                            onBlur={() => this.validate("firstName")}
                            onChange={this.handleChange("firstName")}
                            errorMessage={errorMessageFirstName}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            value={lastName}
                            hasError={errorLastName}
                            onBlur={() => this.validate("lastName")}
                            onChange={this.handleChange("lastName")}
                            errorMessage={errorMessageLastName}
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                            value={email}
                            hasError={errorEmail}
                            onBlur={() => this.validate("email")}
                            onChange={this.handleChange("email")}
                            errorMessage={errorMessageEmail}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            hasError={errorPassword}
                            onBlur={() => this.validate("password")}
                            onChange={this.handleChange("password")}
                            errorMessage={errorMessagePassword}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            hasError={errorConfirmPassword}
                            onBlur={() => this.validate("confirmPassword")}
                            onChange={this.handleChange("confirmPassword")}
                            errorMessage={errorMessageConfirmPassword}
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

export default compose(withContext) (EmployeeCredentialSignUp)
