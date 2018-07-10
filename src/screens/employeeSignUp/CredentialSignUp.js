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

    handleChange = (name, event) => {
        this.setState({
            [name]: event.nativeEvent.text,
        });
    };

    attemptSignUp = () => {
        console.log(this.state)
        console.log(this.props.context)
        const {confirmPassword, password} = this.state;
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
            this.props.navigation.navigate("categorySelect")
        }
    };


    render(){
        const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
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
                            onChange={(event) => this.handleChange("firstName", event)}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            onChange={(event) => this.handleChange("lastName", event)}
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                            onChange={(event) => this.handleChange("email", event)}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            type="password"
                            onChange={(event) => this.handleChange("password", event)}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(event) => this.handleChange("confirmPassword", event)}
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
