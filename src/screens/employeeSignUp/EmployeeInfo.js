import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {
    Container,
    H3,
    Input,
    Item,
    Text,
} from "native-base";
import {
    NextButton,
    SignUpForm,
    StatusDropdown,
    Stepper,
    TextInput,
    TextInputWithLabel
} from "../../components/";

class EmployeeInfo extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Stepper
                    currentPosition={2}
                    stepCount={4}
                />
                <SignUpForm>
                    <H3>Your top skills</H3>
                    <Text style={styles.text}>Suggestion of popular skills for </Text>
                    <TextInput
                        placeholder={"1. Add ..."}
                    />
                    <TextInput
                        placeholder={"2. Add ..."}
                    />
                    <View style={styles.marginVertical}>
                        <TextInputWithLabel
                            style={styles.text}
                            label={"Degree"}
                            placeholder={"Degree"}
                        />
                    </View>
                    <Text>Status</Text>
                    <StatusDropdown />
                    <NextButton onPress={() => navigate("workExp")}/>
                </SignUpForm>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        marginVertical: 10
    },
    marginVertical: {
        marginVertical: 20
    }
});

export default compose() (EmployeeInfo)
