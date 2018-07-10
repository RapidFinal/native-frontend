import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";

class Home_Test extends React.Component {

    static propTypes = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('ViewProfile')}
                    title="Profile"
                    color="#841584"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('ViewEmployerProfile')}
                    title="Employer Profile"
                    color="#841584"
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (Home_Test)
