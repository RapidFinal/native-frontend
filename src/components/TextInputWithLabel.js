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
        const {label, onChange, placeholder, type, value} = this.props;
        const isPassword = type === 'password';
        return (
            <View>
                <Text style={styles.label}>{label}</Text>
                <Item regular style={styles.input}>
                    <Input
                        placeholder={placeholder}
                        secureTextEntry={isPassword}
                        value={value}
                        onChange={onChange}
                    />
                </Item>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        marginBottom: 10
    },
    label: {
        fontSize: 18
    }
});

export default compose() (TextInputWithLabel)
