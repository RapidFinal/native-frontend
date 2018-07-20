import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Text} from "native-base";

class SaveButton extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const {} = this.state;
        return (
            <Button
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Text style={styles.saveText}>Save</Text>
            </Button>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: '#8BD2EB',
    },

    saveText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff'
    },
});

export default compose() (SaveButton)
