import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, View} from "react-native";

class Login_Test extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Login Screen</Text>
                <Button
                    title="Login as Employer"
                    onPress={() => this.props.navigation.navigate('MainEmployer')}
                />
                <Button
                    title="Login as Candidate"
                    onPress={() => this.props.navigation.navigate('MainCandidate')}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (Login_Test)
