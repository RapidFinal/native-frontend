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
    Button,
    Icon
} from "native-base";
import {
    Stepper,
    BackButton,
    NextButton,
    StatusDropdown
} from "../components";

const TextInputWithLabel = ({text}) => (
    <View>
        <Text>{text}</Text>
        <Item regular style={styles.textInput}>
            <Input placeholder={text} />
        </Item>
    </View>
);

const TextInput = ({text}) => (
    <View style={styles.textInput}>
        <Item regular>
            <Input placeholder={text} />
        </Item>
    </View>
);

const AddButton = () => (
    <Button rounded style={[styles.center, styles.marginTop]}>
        <Icon name='md-add' />
    </Button>
);

const SubmitButton = ({submit}) => (
    <Button onPress={submit}>
        <Text>Submit</Text>
    </Button>
);

const AccountInfo = () => (
    <Form style={styles.marginTop}>
        <TextInputWithLabel text={"First name"} />
        <TextInputWithLabel text={"Last name"} />
        <TextInputWithLabel text={"Email"} />
        <TextInputWithLabel text={"Password"} />
        <TextInputWithLabel text={"Confirm Password"} />
    </Form>
);

const SelectCategory = () => (
    <View>
        <Text>Page 2</Text>
    </View>);

const EmployeeInfo = ({selectedSkill}) => (
    <Form style={styles.marginTop}>
        <H3>Your top skills</H3>
        <Text style={styles.text}>Suggestion of popular skills for {selectedSkill}</Text>
        <TextInput text={"1. Add..."}/>
        <TextInput text={"2. Add..."}/>
        <TextInputWithLabel text={"Degree"}/>
        <StatusDropdown />
    </Form>
);

const WorkExp = () => (
    <Form style={styles.grayBackground}>
        <TextInputWithLabel text="Title" />
        <TextInputWithLabel text="Description" />
    </Form>
);

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
                return (
                    <View>
                        <AddButton/>
                        <View style={styles.buttons}>
                            {backButton}
                            <SubmitButton/>
                        </View>
                    </View>
                );
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
                    <View style={styles.marginTop}>
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

export default compose() (EmployeeSignup)
