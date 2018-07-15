import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet,View} from "react-native";
import {Toast, Button, Container, Content, Text} from "native-base";
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
            <Container>
                <Content>
                    <Stepper
                        currentPosition={1}
                        stepCount={2}
                    />
                    <CategoriesSelection/>
                    <Button
                        style={[styles.submitButton, styles.center]}
                        onPress={this.submit}
                    >
                        <Text>Submit</Text>
                    </Button>
                </Content>

            </Container>
        )
    }
}

const styles = StyleSheet.create({

    center: {
        alignSelf: "center",
    },
    submitButton: {
        marginVertical: 60,
    },

});

export default hoistStatics(compose(withContext)) (EmployerCategorySelect)
