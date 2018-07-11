import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Text} from "native-base";
import {
    NextButton,
    Stepper
} from "../../components";

class EmployeeCategorySelect extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {navigation} = this.props;
        return (
            <Container>
                <Stepper
                    currentPosition={1}
                    stepCount={4}
                />
                <Text>Category Select</Text>
                <NextButton
                    onPress={() => navigation.navigate('employeeInfo')}
                />
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (EmployeeCategorySelect)
