import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, TextInput} from "react-native";
import {Item, Text} from "native-base";


class TextInputWithLabel extends React.Component {

    static propTypes = {
        inputText: PropTypes.string
    }

    state = {
        inputText: ""
    }

    render(){
        const {
            errorMessage,
            hasError,
            label,
            ...other
        } = this.props;
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.label}>{label}</Text>
                <Item regular style={styles.whiteBackground} error={hasError}>
                    <TextInput
                        {...other}
                    />
                </Item>
                {hasError ? <Text style={styles.error}>{errorMessage}</Text> : null}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
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
