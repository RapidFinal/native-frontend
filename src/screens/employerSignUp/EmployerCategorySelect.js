import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button, Container} from "native-base";
import Modal from "react-native-modal";
import Stepper from "../../components/Stepper";
import CategoriesSelection from "../../components/CategoriesSelection";
import {withContext} from "../../context/withContext";

import DatabaseService from "../../api/databaseService";
import hoistStatics from "recompose/hoistStatics";

class EmployerCategorySelect extends React.Component {

    static propTypes = {

    };

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employer)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: () => <View></View>,
        })
    };

    submit(){
        const employer = this.props.context.employer;
        const uid = this.props.context.currentUser.uid;
        const selectedCategories = this.props.context.selectedCategories;
        DatabaseService.createEmployerInfo(uid,employer.firstName,employer.lastName,employer.companyName,selectedCategories);
        this.props.navigation.navigate("MainEmployer");
    }

    render(){
        return (
            <Container style={{flex:1}} >
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

export default hoistStatics(compose(withContext)) (EmployerCategorySelect)
