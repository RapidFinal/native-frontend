import React from 'react';
import compose from 'recompose/compose'
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Container, Text} from "native-base";
import {
    NextButton,
    SignUpForm,
    Stepper,
    TextInputWithLabel
} from "../../components";

import {withContext} from "../../context/withContext";
import {CredentialAuthentication} from "../../api/authentication";
import hoistStatics from "recompose/hoistStatics";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class EmployerCredentialSignUp extends React.Component {

    static propTypes = {

    }

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employer)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    state = {
        credential: {
            firstName: "",
            lastName: "",
            companyName:"",
            email: "",
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
            message: {
                firstName: "Required",
                lastName: "Required",
                companyName:"Required",
                email: "Required",
                password: "Required",
                confirmPassword: "Required",
            }
        }
    };

    handleChange = (name) => (event) => {
        const {credential} = this.state;
        credential[name] = event.nativeEvent.text;
        this.setState({credential});
    };

    setError = (errorField, message) => {
        const {error} = this.state;
        if (message !== null) {
            error.flags[errorField] = true;
            error.message[errorField] = message;
            this.setState({error})
        }
        else {
            error.flags[errorField] = false;
            this.setState({error})
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
        const {credential} = this.state;

        const {navigation} = this.props;

        if (this.passAllFlags()) {
            const {email, password} = {
                email: credential.email,
                password: credential.password,
            };

            CredentialAuthentication.signin({email, password}).
            then(() => {
                this.setError("email", "Email already in use")
                CredentialAuthentication.signout();
            }).
            catch(error => {
                if (error.code === "auth/user-not-found") {
                    const employer = {
                        firstName: credential.firstName,
                        lastName: credential.lastName,
                        companyName: credential.companyName,
                        email: credential.email,
                        password: credential.password
                    };
                    this.props.setContext({employer: employer});
                    navigation.navigate("employerCategorySelect")
                }
                else if (error.code === "auth/invalid-email") {
                    this.setError("email", "Email is not valid")
                }
                else {
                    this.setError("email", "Email already in use")
                }
            })
        }
    };

    render(){
        const {
            firstName,
            lastName,
            companyName,
            email,  password,
            confirmPassword
        } = this.state.credential;
        const {message, flags} = this.state.error;
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
                            errorMessage={message.firstName}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            value={lastName}
                            hasError={flags.lastName}
                            onBlur={() => this.validate("lastName")}
                            onChange={this.handleChange("lastName")}
                            errorMessage={message.lastName}
                        />

                        <TextInputWithLabel
                            label="Company Name"
                            placeholder="Company Name"
                            value={companyName}
                            hasError={flags.companyName}
                            onBlur={() => this.validate("companyName")}
                            onChange={this.handleChange("companyName")}
                            errorMessage={message.companyName}
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                            value={email}
                            hasError={flags.email}
                            onBlur={() => this.validate("email")}
                            onChange={this.handleChange("email")}
                            errorMessage={message.email}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            hasError={flags.password}
                            onBlur={() => this.validate("password")}
                            onChange={this.handleChange("password")}
                            errorMessage={message.password}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            hasError={flags.confirmPassword}
                            onBlur={() => this.validate("confirmPassword")}
                            onChange={this.handleChange("confirmPassword")}
                            errorMessage={message.confirmPassword}
                        />
                        <NextButton
                            onPress={this.attemptSignUp}
                            // onPress={()=>this.props.navigation.navigate("employerCategorySelect")}
                        />
                    </SignUpForm>
                </ScrollView>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose(withContext)) (EmployerCredentialSignUp)
