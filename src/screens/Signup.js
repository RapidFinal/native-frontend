import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Body, Button, Container, Header, Icon, Left, Right, Text} from "native-base";

class Signup extends React.Component {

    static propTypes = {

    }

    static navigationOptions = () => {
        return ({
            title: 'Sign up',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: () => <View></View>,
        })
    };

    state = {
        isModalVisible:false,
    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;

        const {navigation} = this.props
        return (
            <Container style={styles.container}>
                <Text
                    style={styles.title}>
                    Sign Up
                </Text>
                <Button
                    info
                    style={styles.centerButton}
                    onPress={()=>navigation.navigate('employeeCredentialSignUp')}>
                    <Text>
                        Employee
                    </Text>
                </Button>

                <Button
                    info
                    style={styles.centerButton}
                    onPress={()=>navigation.navigate('employerCredentialSignUp')}>
                    <Text>
                        Employer
                    </Text>
                </Button>


            </Container>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center'
    },
    centerButton:{
        alignSelf:'center',
        padding:20,
        margin:5
    },
    title:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        padding:20,
    },
    closeButton:{
        top : 10,
        right : 10,
        // padding : 10,
        position :'absolute',
    }

});

export default compose() (Signup)
