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

class EmployerCredentialSignUp extends React.Component {

    static propTypes = {

    }

    state = {
        email: "",
        companyName:"",
        password: "",
        confirmPassword: ""
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        console.log(name)
        console.log(event.target.value)
    };

    render(){
        const {navigation} = this.props;
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
                    <SignUpForm>
                        <TextInputWithLabel
                            label="Email"
                            placeholder="Email"
                        />
                        <TextInputWithLabel
                            label="Company Name"
                            placeholder="Company Name"
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
                            onPress={() => navigation.push('employerCategorySelect')}
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

export default compose() (EmployerCredentialSignUp)
