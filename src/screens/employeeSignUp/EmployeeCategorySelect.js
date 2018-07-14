import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Toast} from "native-base";
import {CategoriesSelection, NextButton, Stepper} from "../../components";
import {withContext} from "../../context/withContext";

class EmployeeCategorySelect extends React.Component {

    static propTypes = {
        selectedCategories: PropTypes.object
    };

    state = {
        selectedCategories:{}
    }

    componentDidMount(){
        this.setState({
            selectedCategories: this.props.context.selectedCategories
        })
    }

    submit = () => {
        const {context, navigation} = this.props;

        if (Object.keys(context.selectedCategories).length === 0){
            Toast.show({
                text: "Please select at least one category!",
                buttonText: "Okay",
                duration: 3000,
            })
        }
        else {
            navigation.navigate("employeeInfo");
        }
    };

    render(){
        const {selectedCategories} = this.state;
        return (
            <Container style={{flex:1}} >
                <Stepper
                    currentPosition={1}
                    stepCount={4}
                />
                <CategoriesSelection
                    selectedCategories={selectedCategories}
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

export default compose(withContext) (EmployeeCategorySelect)
