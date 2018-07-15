import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from "react-native";
import {Toast, Button, Container} from "native-base";
import Stepper from "../../components/Stepper";
import CategoriesSelection from "../../components/CategoriesSelection";
import {withContext} from "../../context/withContext";

import DatabaseService from "../../api/databaseService";
import hoistStatics from "recompose/hoistStatics";
import {CredentialAuthentication} from "../../api/authentication";

class EmployerCategorySelect extends React.Component {

    static propTypes = {
    };

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employer)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    submit = async () =>{
        
        const {employer, selectedCategories} = this.props.context
        const {navigation, setContext} = this.props;
        
        if (Object.keys(selectedCategories).length ===0){
            Toast.show({
                text: "Please select at least one category!",
                buttonText: "Okay",
                duration: 3000,
            })
            return;
        }

        const {email, password} = {
            email: employer.email,
            password: employer.password,
        };

        try {
            const auth = await CredentialAuthentication.signup({email, password})
            const uid = this.props.context.currentUser.uid
            console.log('auth')
            console.log(auth)
            DatabaseService.createEmployerInfo(
                uid,
                employer.firstName,
                employer.lastName,
                employer.companyName,
                selectedCategories
            )
            setContext({employer: null});
            navigation.navigate("MainEmployer")
        }
        catch (error) {
            console.log(error.code)
        }
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
