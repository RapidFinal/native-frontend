import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Container, Toast} from "native-base";
import {CategoriesSelection, NextButton, Stepper} from "../../components";
import {withContext} from "../../context/withContext";
import hoistStatics from "recompose/hoistStatics";

class EmployeeCategorySelect extends React.Component {

    static propTypes = {
        selectedCategories: PropTypes.object
    };

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employee)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    state = {
        selectedCategories:{}
    }

    setSelectedCategoriesState = (selected) => {
        this.setState({
            selectedCategories: selected
        })
    }

    submit = () => {
        const {navigation, setContext} = this.props;
        const {selectedCategories} = this.state;

        console.log(selectedCategories)
        if (Object.keys(selectedCategories).length === 0){
            Toast.show({
                text: "Please select at least one category!",
                buttonText: "Okay",
                duration: 3000,
            })
        }
        else {
            setContext({selectedCategories})
            navigation.navigate("employeeInfo");
        }
    };

    render(){
        return (
            <Container style={{flex:1}} >
                <Stepper
                    currentPosition={1}
                    stepCount={4}
                />
                <CategoriesSelection
                    setSelectedState={this.setSelectedCategoriesState}
                />
                <NextButton
                    onPress={this.submit}
                    style={styles.submitButton}>

                </NextButton>

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

export default hoistStatics(compose(withContext)) (EmployeeCategorySelect)
