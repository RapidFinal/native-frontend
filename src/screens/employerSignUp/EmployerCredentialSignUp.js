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

class EmployerCredentialSignUp extends React.Component {

    static propTypes = {

    }

    state = {
        firstName:"",
        lastName:"",
        email: "",
        companyName:"",
        password: "",
        confirmPassword: "",
        error : '',
    };

    handleChange = (name, event) => {
        this.setState({
            [name]: event.nativeEvent.text,
        });
    };

    attemptSignUp = () => {
        // console.log(this.state)
        // console.log(this.props.context)
        // const {confirmPassword, password} = this.state;
        // Object.keys(this.state).forEach(key => {
        //     if (key!== "error" && this.state[key] === '') {
        //         console.log("Every field should not be empty")
        //     }
        // });
        // if (confirmPassword !== password) {
        //     console.log("Password and confirmed password are mismatch")
        // }
        // else if (password.length < 6) {
        //     console.log("The length of password is too short")
        // }
        // else {
        //     let employerInfo = {
        //         email : this.state.email,
        //         companyName: this.state.companyName,
        //         password : this.state.password,
        //     }
        //     this.props.setContext({employerInfo: employerInfo})
            this.props.navigation.navigate("employerCategorySelect")
        // }
    };

    render(){
        return (
            <Container>

                <Text
                    style={styles.title}>
                    Employer Sign Up
                </Text>
                <Stepper
                    currentPosition={0}
                    stepCount={2}
                />
                <ScrollView>
                    <Text></Text>
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
                            onChange={(event) => this.handleChange("Email", event)}
                        />
                        <TextInputWithLabel
                            label="Company Name"
                            placeholder="Company Name"
                            onChange={(event) => this.handleChange("CompanyName", event)}
                        />
                        <TextInputWithLabel
                            label="Password"
                            placeholder="Password"
                            type="password"
                            onChange={(event) => this.handleChange("Password", event)}
                        />
                        <TextInputWithLabel
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(event) => this.handleChange("confirmedPassword", event)}
                        />
                        <NextButton
                            onPress={()=>this.attemptSignUp()}
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
