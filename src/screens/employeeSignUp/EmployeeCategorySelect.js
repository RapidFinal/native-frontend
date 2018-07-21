import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Container, Spinner, Toast} from "native-base";
import {CategoriesSelection, NextButton, Stepper} from "../../components";
import {withContext} from "../../context/withContext";
import hoistStatics from "recompose/hoistStatics";

const DataLoading = () => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

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
        selectedCategories:{},
        ready: false
    }

    setSelectedCategoriesState = (selected) => {
        this.setState({
            selectedCategories: selected
        })
    }

    submit = () => {
        const {navigation, setContext} = this.props;
        const {selectedCategories} = this.state;

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

    setReady = (isReady) =>{
        this.setState({
            ready: isReady
        })
    }

    render(){
        const {ready} = this.state;
        return (
            <Container style={{flex:1}} >
                <Stepper
                    currentPosition={1}
                    stepCount={4}
                />
                <CategoriesSelection
                    setSelectedState={this.setSelectedCategoriesState}
                    setReady={this.setReady}
                />
                {ready ? (
                    <NextButton
                        style={styles.NextButton}
                        onPress={this.submit}
                    />
                ) : null}

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NextButton: {
        position: 'absolute',
        bottom:0,
    }
});

export default hoistStatics(compose(withContext)) (EmployeeCategorySelect)
