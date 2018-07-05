import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import StepIndicator from "react-native-step-indicator";

class Stepper extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render() {
        const {} = this.state;
        return (
            <StepIndicator
                customStyles={customStyles}
                currentPosition={this.props.currentPosition}
                stepCount={this.props.stepCount}
            />
        )
    }

}

const styles = StyleSheet.create({

});

const customStyles = {

}

export default compose() (Stepper)