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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render(){
        const {firstName} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {navigation} = this.props;
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
                        />
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            type="password"
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                        />
                        <NextButton
                            onPress={() => navigation.push('categorySelect')}
                        />
                    </SignUpForm>
                </ScrollView>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (CredentialSignUp)
