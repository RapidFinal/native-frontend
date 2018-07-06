import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import {Stepper} from "../components";
import {Body, CheckBox, Form, Input, Item, Label, ListItem} from "native-base";
import Modal from "react-native-modal";

const catData={
    "cat1":{"s1":true, "s2":false},
    "cat2":{"s3":false, "s4":false},
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

const SelectCategory = () => (
    <View>
        <Text>Choose the categories and sub-categories that you looking for</Text>
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
        modalPageKey :'',
        isModalVisible:false,

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

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    checkboxList=(key)=>{
        if(key !== ""){
            return Object.keys(catData[key]).map((data, index)=>(
                <ListItem key={index}>
                    <CheckBox checked={catData[key][data]} />
                    <Body>
                    <Text>{data}</Text>
                    </Body>
                </ListItem>
            ))
        }
        else{
            return null
        }
    };

    categoriesButton=
        Object.keys(catData).map((key, index) => (
            <View key={index}>
                <Button title={key} color={'green'} onPress={()=>{
                    this.setState({
                        modalPageKey : key
                    })
                    this._toggleModal();
                }}/>
            </View>
        ));

    displayStep = () => {
        switch (this.state.currentStep) {
            case 0:
                return <AccountInfo/>;
            case 1:
                return (
                    <View>
                        <SelectCategory/>
                        {this.categoriesButton}
                        <Modal
                            isVisible={this.state.isModalVisible}
                            onBackdropPress={this._toggleModal}>
                            <View style={{
                                flex: 1 ,
                                backgroundColor:'white'}}>
                                <Text>Hello!</Text>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Text>Hide me!</Text>
                                </TouchableOpacity>
                                {this.checkboxList(this.state.modalPageKey)}
                            </View>
                        </Modal>
                    </View>
                );
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

                <Text>{this.state.modalPageKey}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (EmployerSignup)
