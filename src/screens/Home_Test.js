import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from "react-native";

class Home_Test extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (Home_Test)
