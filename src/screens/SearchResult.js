import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right  } from 'native-base';
import SearchCard from "../components/SearchCard";

class SearchResult extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'stretch' }}>
                <Text>Search Results</Text>
                <SearchCard results={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (SearchResult)
