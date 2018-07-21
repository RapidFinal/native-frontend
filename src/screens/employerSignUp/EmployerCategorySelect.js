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

    state = {
        selectedCategories:{},
        showSubmit:false,
    }

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employer)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    setSelectedCategoriesState = (selected) => {
        this.setState({
            selectedCategories: selected,
        })
    }

    setReady = (status) =>{
        this.setState({
            showSubmit: status
        })
    }

    submit = async () =>{
        const {employer} = this.props.context
        const {selectedCategories} = this.state
        const {navigation, setContext} = this.props
        console.log(selectedCategories)
        
        if (Object.keys(selectedCategories).length <1){
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
            const uid = this.props.context.currentUser.uid;

            let db = new DatabaseService
            db.createEmployerInfo(
                uid,
                employer.firstName,
                employer.lastName,
                employer.companyName,
                selectedCategories
            )
            setContext({
                employer: null,
            });
            this.setState({selectedCategories:""})

            navigation.navigate("MainEmployer")
        }
        catch (error) {
            console.log(error.code)
        }
    }

    render(){
        const {selectedCategories,showSubmit} = this.state
        return (
            <Container>
                    <Content>
                        <Stepper
                            currentPosition={1}
                            stepCount={2}
                        />
                        {console.log(selectedCategories)}
                        <CategoriesSelection
                            setSelectedState={this.setSelectedCategoriesState}
                            setReady={this.setReady}
                        />
                        {showSubmit ? (
                            <Button
                                style={[styles.submitButton, styles.center]}
                                onPress={this.submit}
                            >
                                <Text>Submit</Text>
                            </Button>

                        ) : null}
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
        backgroundColor: "#15BBCF"
    }

});

export default hoistStatics(compose(withContext)) (EmployerCategorySelect)
