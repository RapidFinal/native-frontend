import React from 'react';
import compose from 'recompose/compose'
import HomeCard from '../components/HomeCard'
import SwiperFlatList from 'react-native-swiper-flatlist';
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View, FlatList, ScrollView } from 'react-native';
import {Container, Text} from "native-base";

class Home extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const { } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Text>
                    Recommended
                </Text>
                <SwiperFlatList
                    style={styles.swipeBox}
                    index={0}
                    // showPagination
                >
                    <HomeCard/>
                    <HomeCard/>
                    <HomeCard/>
                    <HomeCard/>
                </SwiperFlatList>
                <Text>
                    Recently Viewed
                </Text>
                <SwiperFlatList
                    style={styles.swipeBox}
                    index={0}
                    // showPagination
                >
                    <HomeCard/>
                    <HomeCard/>
                    <HomeCard/>
                    <HomeCard/>
                </SwiperFlatList>
            </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    swipeBox: {
        marginBottom: 10,
    },
    container: {
        marginTop: 100,
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
    },
});

export default compose() (Home)
