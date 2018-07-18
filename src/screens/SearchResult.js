import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import { Content, Text, Spinner } from 'native-base';
import SearchCard from "../components/SearchCard";
import { Search } from "../api/search";
import SearchBox from 'react-native-search-box';


class SearchResult extends React.Component {

    static propTypes = {
        textInput: PropTypes.string,
	catergoryQuery: PropTypes.shape(
	    {categoryId: PropTypes.string.isRequired,
	     subCategoryId: PropTypes.string.isRequired}),
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

    goToProfile = (uid) => {
        //console.log('navigateTo:', uid);
        this.props.navigation.navigate("View", {uid});
    }

    search = (textInput) => {
	this.setState({loading: true});
	Search.search(textInput).then((d) => {
            this.setState({results: d, loading: false});
        }).catch(e => console.error(e));
    }

    componentDidMount() {
        //console.log(this.props.navigation.state.params);
        //console.log(this.props.navigation.getParam("textInput", ""));
        const textInput = this.props.navigation.getParam("textInput", "");
	const categoryQuery = this.props.navigation.getParam("categoryQuery", null);
        //console.log('search: ', textInput);
	this.setState({textInput});
	this.search(textInput);
    }

    render(){
        const {loading, textInput, results} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Content contentContainerStyle={styles.ScrollContainer}>
                <SearchBox
                    defaultValue={textInput}
                    placeholder="Search"
                    cancelTitle="Cancel"
                    backgroundColor="white"
                    titleCancelColor="#007AFF"
                    onChangeText={(textInput) => this.setState({textInput})}
                    afterSearch={() => this.search(this.state.textInput)} >
	        </SearchBox>
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
