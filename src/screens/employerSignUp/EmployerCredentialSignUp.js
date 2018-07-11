import React from 'react';
import compose from 'recompose/compose'
import {ScrollView, StyleSheet} from "react-native";
import {Button, Container, Text} from "native-base";
import {
    NextButton,
    SignUpForm,
    Stepper,
    TextInputWithLabel
} from "../../components";

import {withContext} from "../../context/withContext";
import {CredentialAuthentication} from "../../api/authentication";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class EmployerCredentialSignUp extends React.Component {

    static propTypes = {

    }

    state = {
        credential: {
            firstName: "",
            lastName: "",
            email: "",
            companyName:"",
            password: "",
            confirmPassword: ""
        },
        error: {
            flags: {
                firstName: false,
                lastName: false,
                email: false,
                companyName:false,
                password: false,
                confirmPassword: false,
            },
            errorMessageFirstName: "Required",
            errorMessageLastName: "Required",
            errorMessageEmail: "Required",
            errorMessageCompanyName: "Required",
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
        // const errorKey = "error".concat(capErrorField);
        if (message !== null) {
            error.flags[errorField] = true;
            const errorMessage = "errorMessage".concat(capErrorField);
            error[errorMessage] = message;
            this.setState({error})
        }
        else {
            error.flags[errorField] = false;
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

    passAllFlags = () => {
        const {credential, error} = this.state;
        let flag = true;
        Object.keys(error.flags).forEach(errorField => {
            if (credential[errorField] === '') {
                this.validate(errorField);
                flag = false;
            }
        });
        return flag;
    }

    attemptSignUp = async () => {
        const {
            firstName,
            email,
            companyName,
            lastName,
            password
        } = this.state.credential;

        const {navigation} = this.props;

        if (this.passAllFlags()) {
            try {
                const signup = await CredentialAuthentication.signup({email, password});
                const employer = {
                    firstName: firstName,
                    lastName: lastName,
                    companyName: companyName,
                    email: email,
                    password: password
                };
                this.props.setContext({employer: employer});
                navigation.navigate("employerCategorySelect")
            } catch (error) {
                if (error.code === "auth/invalid-email") {
                    this.setError("email", "Email is not valid")
                }
                else if (error.code === "auth/email-already-in-use") {
                    this.setError("email", "Email already in use")
                }
            }
        }
    };

    render(){
        const {firstName, lastName, email, companyName, password, confirmPassword} = this.state.credential; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {
            errorMessageFirstName,
            errorMessageLastName,
            errorMessageEmail,
            errorMessageCompanyName,
            errorMessagePassword,
            errorMessageConfirmPassword,
            flags
        } = this.state.error;
        return (
            <Container>
                <Stepper
                    currentPosition={0}
                    stepCount={2}
                />
                <ScrollView>
                    <SignUpForm>
                        <TextInputWithLabel
                            label="First name"
                            placeholder="First name"
                            value={firstName}
                            hasError={flags.firstName}
                            onBlur={() => this.validate("firstName")}
                            onChange={this.handleChange("firstName")}
                            errorMessage={errorMessageFirstName}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            value={lastName}
                            hasError={flags.lastName}
                            onBlur={() => this.validate("lastName")}
                            onChange={this.handleChange("lastName")}
                            errorMessage={errorMessageLastName}
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                            value={email}
                            hasError={flags.email}
                            onBlur={() => this.validate("email")}
                            onChange={this.handleChange("email")}
                            errorMessage={errorMessageEmail}
                        />
                        <TextInputWithLabel
                            label="Company Name"
                            placeholder="Company Name"
                            value={companyName}
                            hasError={flags.companyName}
                            onBlur={() => this.validate("companyName")}
                            onChange={this.handleChange("companyName")}
                            errorMessage={errorMessageCompanyName}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            hasError={flags.password}
                            onBlur={() => this.validate("password")}
                            onChange={this.handleChange("password")}
                            errorMessage={errorMessagePassword}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            hasError={flags.confirmPassword}
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

    marginTop: {
        marginTop: 10
    },
    textInput: {
        backgroundColor: 'white',
        marginBottom: 10
    },
    title:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf:'center',
    },
});

export default compose(withContext) (EmployerCredentialSignUp)
