import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";
import {Stepper} from "../components";
import {Form, Input, Item, Label} from "native-base";

const AccountInfo = () => (
    <View>
        <Form>
            <Item fixedLabel>
                <Label>Email</Label>
                <Input
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email: email})}/>
            </Item>
            <Item fixedLabel>
                <Label>Password</Label>
                <Input
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password: password})}/>
            </Item>
            <Item fixedLabel>
                <Label>Confirmed Password</Label>
                <Input
                    secureTextEntry
                    placeholder="Confirmed Password"
                    onChangeText={(confirmedPassword) => this.setState({confirmedPassword: confirmedPassword})}/>
            </Item>
            <Item fixedLabel last>
                <Label>Company Name</Label>
                <Input
                    placeholder="Company Name"
                    onChangeText={(companyName) => this.setState({companyName: companyName})}/>
            </Item>

        </Form>

    </View>
);

const SelectCategory = () => (

    <View>
        <Text>Choose the categories that you looking for</Text>
        {/*Object.keys(catData).map(key => (*/}
        {/*<Button block info key={key}>*/}
            {/*<Text>*/}
                {/*{key}*/}
            {/*</Text>*/}
        {/*</Button>*/}
        {/*));*/}

    </View>);

class EmployerSignup extends React.Component {

    static propTypes = {

    };

    state = {
        currentStep: 0,
        email:'',
        password:'',
        confirmedPassword:'',
        companyName:'',
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
