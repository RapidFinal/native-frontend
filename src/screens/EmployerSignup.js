import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import EmployerSignUpAccountPage from "./employerSignUp/EmployerCredentialSignUp"
import SelectCategory from "./employerSignUp/EmployerCategorySelect"
import Stepper from "../components/Stepper";
import {StyleSheet, View, Button} from "react-native";
import {Container, Content} from "native-base";

class EmployerSignup extends React.Component {

    static propTypes = {

    };

    state = {
        currentStep: 0,

    };

    nextStep = () => {
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    };

    prevStep = () => {
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    };

    displayStep = () => {
        switch (this.state.currentStep) {
            case 0:
                return <EmployerSignUpAccountPage/>
            case 1:
                return <SelectCategory/>
        }
    };

    displayButtons = () => {
        const NextButton = <Button title="Next" onPress={this.nextStep}/>;
        const BackButton = <Button title="Back" onPress={this.prevStep}/>;
        const SubmitButton = <Button title="Submit" onPress={()=>{}}/>
        switch (this.state.currentStep) {
            case 0:
                return NextButton;
            case 1:
                return (
                    <View>
                        {BackButton}
                        {SubmitButton}
                    </View>
                );
        }
    };

    render(){
        const {} = this.state;
        const stepCount = 2;
        return (
            <Container>
                <Content style={styles.content}>
                    <Stepper
                        currentPosition={this.state.currentStep}
                        stepCount={stepCount}
                    />
                    {/*<View style={styles.marginTop}>*/}
                        {this.displayStep()}
                        {this.displayButtons()}
                    {/*</View>*/}
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    content: {
        marginTop: 25,
        marginHorizontal: 50
    },
    marginTop: {
        marginTop: 10
    },
    textInput: {
        backgroundColor: 'white',
        marginBottom: 10
    },
    nextButton: {
        alignSelf: 'flex-end',
        marginTop: 10
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginVertical: 10
    },
    center: {
        alignSelf: "center"
    },
    grayBackground: {
        padding: 20,
        backgroundColor: "#F0F0F0"
    }
});

export default compose() (EmployerSignup)
