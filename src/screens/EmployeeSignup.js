import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {
    Container,
    Content,
    Form,
    Input,
    Item,
    Text,
    H3,
} from "native-base";
import {
    Stepper,
    BackButton,
    NextButton
} from "../components";

const TextInput = ({text}) => (
    <View style={styles.textInput}>
        <Text>{text}</Text>
        <Item regular>
            <Input placeholder={text} />
        </Item>
    </View>
);

const AccountInfo = () => (
    <Form style={styles.form}>
        <TextInput text={"First name"} />
        <TextInput text={"Last name"} />
        <TextInput text={"Email"} />
        <TextInput text={"Password"} />
        <TextInput text={"Confirm Password"} />
    </Form>
);

const SelectCategory = () => (
    <View>
        <Text>Page 2</Text>
    </View>);

const EmployeeInfo = ({selectedSkill}) => (
    <Form>
        <H3>Your top skills</H3>
        <Text>Suggestion of popular skills for {selectedSkill}</Text>
    </Form>
);

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
                return <EmployeeInfo selectedSkill={"Design"}/>;
            case 3:
                return <WorkExp/>
        }
    };

    displayButtons = () => {
        const nextButton = <NextButton onPress={this.nextStep}/>;
        // const NextButton = <Button title="Next" onPress={this.nextStep}/>;
        const backButton = <BackButton onPress={this.prevStep}/>;
        switch (this.state.currentStep) {
            case 0:
                return (
                    <View style={styles.nextButton}>
                        {nextButton}
                    </View>
                );
            case 1:
            case 2:
                return (
                    <View style={styles.buttons}>
                        {backButton}
                        {nextButton}
                    </View>
                );
            case 3:
                return backButton;
        }
    };

    render(){
        const {} = this.state;
        const stepCount = 4;
        return (
            <Container>
                <Content style={styles.content}>
                    <Stepper
                        currentPosition={this.state.currentStep}
                        stepCount={stepCount}
                    />
                    <View style={styles.form}>
                        {this.displayStep()}
                        {this.displayButtons()}
                    </View>
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
    form: {
        marginTop: 10
    },
    textInput: {
        marginBottom: 10
    },
    nextButton: {
        alignSelf: 'flex-end',
        marginTop: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default compose() (EmployeeSignup)
