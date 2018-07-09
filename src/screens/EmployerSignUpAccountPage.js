import React from 'react';
import compose from 'recompose/compose'
import {StyleSheet, Text, View} from "react-native";
import {Form, Input, Item} from "native-base";

const TextInputWithLabel = ({text}) => (
    <View>
        <Text>{text}</Text>
        <Item regular style={styles.textInput}>
            <Input placeholder={text} />
        </Item>
    </View>
);

class EmployerSignUpAccountPage extends React.Component {

    static propTypes = {

    };

    state = {
        currentStep: 0,
        email:'',
        password:'',
        confirmedPassword:'',
        companyName:'',

    };

    accountInfo = () => (
        <View>
            <Form style={styles.marginTop}>
                <TextInputWithLabel text={"Email"}/>
                <TextInputWithLabel text={"Password"}/>
                <TextInputWithLabel text={"Confirmed Password"}/>
                <TextInputWithLabel text={"Company Name"}/>
            </Form>
        </View>
    );

    render(){
        return (
            <View>
                {this.accountInfo()}
            </View>
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
});

export default compose() (EmployerSignUpAccountPage)
