import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Container, Text} from "native-base";

class Signup extends React.Component {

    static propTypes = {

    }

    state = {
        isModalVisible:false,
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;

        const {navigation} = this.props
        return (
            <Container style={styles.container}>

                <Button
                    block
                    info
                    onPress={()=>navigation.goBack()}>
                    <Text>
                        Go back
                    </Text>
                </Button>

                <Text
                    style={styles.title}>
                    Sign Up
                </Text>
                <Button
                    info
                    style={styles.centerButton}
                    onPress={()=>navigation.push('credentialSignUp')}>
                    <Text>
                        Employee
                    </Text>
                </Button>

                <Button
                    info
                    style={styles.centerButton}
                    onPress={()=>navigation.push('employerCredentialSignUp')}>
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

});

export default compose() (Signup)
