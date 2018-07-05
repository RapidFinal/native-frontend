import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from "react-native";

class Like_Test extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Like Screen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (Like_Test)
