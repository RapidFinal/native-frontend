import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import EmployerSignUpAccountPage from "./EmployerSignUpAccountPage"
import SelectCategory from "./SelectCategory"
import Stepper from "../components/Stepper";
import {StyleSheet, View, Button} from "react-native";

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
            <View>
                <Stepper
                    currentPosition={this.state.currentStep}
                    stepCount={stepCount}
                />
                {this.displayStep()}
                {this.displayButtons()}
            </View>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (EmployerSignup)
