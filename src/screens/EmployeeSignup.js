import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";
import {Stepper} from "../components";


const AccountInfo = () => (
    <View>
        <Text>Page 1</Text>
    </View>
);

const SelectCategory = () => (
    <View>
        <Text>Page 2</Text>
    </View>);

const EmployeeInfo = () => (
    <View>
        <Text>Page 3</Text>
    </View>);

const WorkExp = () => (
    <View>
        <Text>Page 4</Text>
    </View>);

class EmployeeSignup extends React.Component {

    static propTypes = {

    };

    state = {
        currentStep: 0
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
                return <AccountInfo/>;
            case 1:
                return <SelectCategory/>;
            case 2:
                return <EmployeeInfo/>;
            case 3:
                return <WorkExp/>
        }
    };

    displayButtons = () => {
        const NextButton = <Button title="Next" onPress={this.nextStep}/>;
        const BackButton = <Button title="Back" onPress={this.prevStep}/>;
        switch (this.state.currentStep) {
            case 0:
                return NextButton;
            case 1:
            case 2:
                return (
                    <View>
                        {NextButton}
                        {BackButton}
                    </View>
                );
            case 3:
                return BackButton;
        }
    };

    render(){
        const {} = this.state;
        const stepCount = 4;
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

export default compose() (EmployeeSignup)
