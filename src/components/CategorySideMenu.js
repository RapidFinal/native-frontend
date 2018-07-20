import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image, StyleSheet} from "react-native";
import {Container, Content, List, ListItem, Spinner, Text} from "native-base";
import IonIcons from 'react-native-vector-icons/Ionicons'
import hoistStatics from "recompose/hoistStatics";
import CategoryItem from './CategoryItem'
import DatabaseService from '../api/databaseService'
import SubCategorySideMenu from "./SubCategorySideMenu";
import _ from 'lodash'
import CenterMe from "./CenterMe";
import CenterTopMe from "./CenterTopMe";

class CategorySideMenu extends React.Component {

    static propTypes = {

    };

    state = {
        items: null,
        categoriesDetails: null,
        error: null
    };

    async componentDidMount(){
        this.fetchData()
    }

    fetchData = async () => {
        console.log("fetching data");
        try {
            const data = await DatabaseService.getAllCategories();
            console.log("data",data);

            const mutate = data.reduce((accu, val) => {
                accu[val.categoryId] = {
                    id: val.categoryId,
                    name: val.categoryName,
                    sub: val.subCategory
                };

                return accu;
            }, {});

            this.setState({
                items: _.map(data, 'categoryId'),
                categoriesDetails: mutate
            })
        } catch (e) {
            // TODO: catch error
            // TODO: Network error
        }
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Categories',
        })
    };

    handleClicked = (key) => () => {
        console.log(this.state.categoriesDetails[key])
        this.props.navigation.push("SubCategorySideMenu", {
            categoryKey: key,
            subCategories: this.state.categoriesDetails[key].sub,
        })
    };

    render(){
        const {categoriesDetails, items} = this.state;

        if (items === null){
            return (
                <CenterTopMe>
                    <Spinner color={"black"}/>
                </CenterTopMe>
            );
        }

        if (_.isEmpty(items)){
            return (
                <CenterMe>
                    <Text>Nothing exist here!</Text>
                </CenterMe>
            );
        }

        return (
            <Container>
                <Content>
                    <List>
                        {
                            items.map(v => {
                                const {id, name} = categoriesDetails[v];
                                return (
                                    <CategoryItem key={id} onPress={this.handleClicked(id)}>{name}</CategoryItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose()) (CategorySideMenu)
