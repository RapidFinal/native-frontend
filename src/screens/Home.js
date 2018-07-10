import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Text, View} from "native-base";

class Home extends React.Component {

    static propTypes = {

    };

    state = {

    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Home'
        })
    }


    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <View style={styles.container}>
                <Text>This is a Home page</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default compose() (Home)
