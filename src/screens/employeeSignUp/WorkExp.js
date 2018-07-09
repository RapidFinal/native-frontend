import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Text} from "native-base";
import {
    Stepper
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
                <Text>Work Exp</Text>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (WorkExp)
