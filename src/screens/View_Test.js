import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, View} from "react-native";

class View_Test extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>View Screen</Text>
                <Button
                    title="Logout"
                    onPress={() => this.props.navigation.navigate('Auth')}
                />
            </View>

        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (View_Test)
