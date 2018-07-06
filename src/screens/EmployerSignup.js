import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button, ListView} from "react-native";
import {Stepper} from "../components";
import {Body, CheckBox, Form, Input, Item, Label, ListItem} from "native-base";

const catData={
    "cat1":["s1","s2"],
    "cat2":["s1","s2"],
}

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

const checkboxList=(key)=>(
    catData[key].map((data, index)=>(
        <ListItem key={index}>
            <CheckBox checked={true} />
            <Body>
                <Text>{data}</Text>
            </Body>
        </ListItem>
    )));

const categoriesButton=
    Object.keys(catData).map((key, index) => (
        <View key={index}>
            <Button title={key} color={'green'} onPress={()=>{}}/>
            {checkboxList(key)}
        </View>
    ));


const SelectCategory = () => (
    <View>
        <Text>Choose the categories that you looking for</Text>
        {categoriesButton}
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
