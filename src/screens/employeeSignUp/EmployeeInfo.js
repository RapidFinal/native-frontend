import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Text} from "native-base";
import {
    NextButton,
    Stepper
} from "../../components/";

class EmployeeInfo extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Stepper
                    currentPosition={2}
                    stepCount={4}
                />
                <Text>Employee Info</Text>
                <NextButton
                    onPress={() => this.props.navigation.push('workExp')}
                />
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (EmployeeInfo)
