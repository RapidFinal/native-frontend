import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Input, Item, Text} from "native-base";

class TextInput extends React.Component {

    static propTypes = {

    }

    state = {
        inputText: ""
    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <View>
                <Item regular style={styles.input}>
                    <Input
                        {...this.props}
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
    }
});

export default compose() (TextInput)