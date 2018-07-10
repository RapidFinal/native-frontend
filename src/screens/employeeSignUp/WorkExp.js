import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Button, Container, H3, Text} from "native-base";
import {
    PlusButton,
    SignUpForm,
    Stepper,
    TextInputWithLabel
} from "../../components";

class WorkExp extends React.Component {

    static propTypes = {

    }

    state = {

    }


    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Stepper
                    currentPosition={3}
                    stepCount={4}
                />
                <SignUpForm>
                    <H3>Work Experience (Optional)</H3>
                    <View style={styles.box}>
                        <TextInputWithLabel
                            label="Degree"
                            placeholder="Degree"
                        />
                        <TextInputWithLabel
                            label="Description"
                            placeholder="Description"
                        />
                    </View>
                </SignUpForm>
                <PlusButton
                    style={[styles.plusButton, styles.center]}
                />
                <Button style={[styles.submitButton, styles.center]}>
                    <Text>Submit</Text>
                </Button>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
    },
    plusButton: {
        marginVertical: 30,
    },
    center: {
        alignSelf: "center",
    },
    submitButton: {
        marginVertical: 60,
    }
});

export default compose() (WorkExp)
