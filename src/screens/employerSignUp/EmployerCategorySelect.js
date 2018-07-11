import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button, Container} from "native-base";
import Modal from "react-native-modal";
import Stepper from "../../components/Stepper";
import CategoriesSelection from "../../components/CategoriesSelection";
import {withContext} from "../../context/withContext";

class EmployerCategorySelect extends React.Component {

    static propTypes = {

    };

    submit(){
        const {employer} = this.props.context.employer

    }

    render(){
        return (
            <Container style={{flex:1}} >
                <Text
                    style={styles.title}>
                    Employer Sign Up
                </Text>
                <Stepper
                    currentPosition={1}
                    stepCount={2}
                />
                <CategoriesSelection/>
                <Button
                    onPress={()=>this.submit()}
                    info
                    style={styles.submitButton}>
                    <Text
                        style={styles.submitText}>
                        Submit
                    </Text>
                </Button>

            </Container>
        )
    }
}

const styles = StyleSheet.create({

    submitButton:{
        alignSelf:'center',
        padding:20,
        margin:5
    },
    submitText:{
        padding:10,
        color:'white',
        fontWeight:'bold',
    },
    title:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf:'center',
    },

});

export default compose(withContext) (EmployerCategorySelect)
