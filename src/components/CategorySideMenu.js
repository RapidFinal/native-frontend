import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image, StyleSheet} from "react-native";
import {Container, Content, List, ListItem, Text} from "native-base";
import IonIcons from 'react-native-vector-icons/Ionicons'
import hoistStatics from "recompose/hoistStatics";
import CategoryItem from './CategoryItem'
import SubCategorySideMenu from "./SubCategorySideMenu";

const category = [
    {
        key: "1",
        name: "Graphic & Design"
    },
    {
        key: "2",
        name: "Marketing"
    },
    {
        key: "3",
        name: "Web & Programming"
    },
    {
        key: "4",
        name: "Consultant"
    }
];


class CategorySideMenu extends React.Component {

    static propTypes = {

    };

    state = {
        selectedCategory: null
    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Categories',
            headerLeft: (
                <IonIcons.Button name="ios-arrow-back" backgroundColor="transparent" color={"black"} onPress={() => navigation.navigate("Home")} />
            ),
        })
    };

    handleClicked = (key) => () => {
        this.props.navigation.push("SubCategorySideMenu", {subcategory: key})

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Content>
                    <List dataArray={category} renderRow={({key, name}) => <CategoryItem  key={key} onPress={this.handleClicked(key)} >{name}</CategoryItem>} />
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose()) (CategorySideMenu)
