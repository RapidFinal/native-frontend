import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Input, Item, Text} from "native-base";

class TextInputWithLabel extends React.Component {

    static propTypes = {

    }

    state = {
        inputText: ""
    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {
            errorMessage,
            hasError,
            label,
            ...other
        } = this.props;
        return (
            <View style={styles.marginBottom}>
                <Text style={styles.label}>{label}</Text>
                <Item regular style={styles.whiteBackground} error={hasError}>
                    <Input
                        {...other}
                    />
                </Item>
                {hasError ? <Text style={styles.error}>{errorMessage}</Text> : null}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    marginBottom: {
        marginBottom: 10
    },
    label: {
        fontSize: 18
    },
    whiteBackground: {
        backgroundColor: 'white',
    },
    error: {
        paddingVertical: 0,
        marginVertical: 0,
        color: 'red',
        fontSize: 14
    }
});

export default compose() (TextInputWithLabel)
