import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Spinner  } from 'native-base';
import SearchCard from "../components/SearchCard";
import {Search} from "../api/search";

class SearchResult extends React.Component {

    static propTypes = {
        textInput: PropTypes.string,
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Search Results',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        });
    };

    state = {
        textInput: "",
        loading: true,
        results: [],
    }

    goToProfile = (userID) => {
	this.props.navigation.navigate("View", {userID});
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params);
        console.log(this.props.navigation.getParam("textInput", ""));
        const searchTerm = this.props.navigation.getParam("textInput", "");
        console.log('search: ', searchTerm);
        Search.search(searchTerm)
        .then((d) => {
            this.setState({results: d, loading: false, textInput: searchTerm},
			  () => {console.log('newstate', this.state);});
        }).catch((e) => console.error(e));
    }

    render(){
        const {loading, textInput, results} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Content contentContainerStyle={styles.ScrollContainer}>
                {
                    !loading ? <DataLoaded results={results} onPress={this.goToProfile} /> : <DataLoading />
                }
            </Content>
        );
    }

}

const DataLoaded = ({results, onPress}) => (
    <View style={styles.MainContainer}>
        <Text>Search Results</Text>
        <SearchCard results={results} onPress={onPress}/>
    </View>
)

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

const styles = StyleSheet.create({
    ScrollContainer: {
        paddingVertical: 20,
    },

    MainContainer: {
        flex: 1,
    },
});

export default compose() (SearchResult)
