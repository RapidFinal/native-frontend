import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import StepIndicator from "react-native-step-indicator";
import {View} from "native-base";

class Stepper extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render() {
        const {} = this.state;
        return (
            <View style={styles.stepper}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.props.currentPosition}
                    stepCount={this.props.stepCount}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    stepper: {
        marginTop: 15,
        marginBottom: 15,
    }
});

const customStyles = {

}

export default compose() (Stepper)