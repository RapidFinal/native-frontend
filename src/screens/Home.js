import React from 'react';
import compose from 'recompose/compose'
import HomeCard from '../components/HomeCard'
import SwiperFlatList from 'react-native-swiper-flatlist';
import PropTypes from 'prop-types'
import { SearchBar } from 'react-native-elements'
import { StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import {Container, Text} from "native-base";

class Home extends React.Component {

    static propTypes = {

    }

    state = {

    }

    onPress = () => {

    }

    onClear = () => {

    }

    onChangeText = () => {

    }

    render(){
        const { } = this.state;
        const userInfo = [
            {
                name: "Pan",
                major: "text1",
                status: "looking for job"
            },
            {
                name: "karn",
                major: "cssss",
                status: "looking"
            },
            {
                name: "sea",
                major: "bba",
                status: "not looking"
            },
            {
                name: "ice",
                major: "cssss",
                status: "looking yo"
            },
            {
                name: "pan",
                major: "bba yo",
                status: "not looking HA"
            }
        ];
        return (
            <ScrollView>
                <SearchBar
                    lightTheme
                    onChangeText={this.onChangeText()}
                    onClear={this.onClear()}
                    searchIcon={{ size: 24 }}
                    placeholder='Search' />
                <Container style={styles.container}>
                    <Text>
                        Recommended
                    </Text>
                    <SwiperFlatList
                        style={styles.swipeBox}
                        index={0}
                    >
                        {userInfo.map((prop, key) => {
                            return (
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this.onPress}
                                    underlayColor="white"
                                    key={key}
                                        >
                                    <HomeCard name={prop.name} major={prop.major} status={prop.status}/>
                                </TouchableHighlight>
                            );
                        })}

                    </SwiperFlatList>
                    <Text>
                        Recently Viewed
                    </Text>
                    <SwiperFlatList
                        style={styles.swipeBox}
                        index={0}
                    >
                        {userInfo.map((prop, key) => {
                            return (
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this.onPress}
                                    underlayColor="white"
                                    key={key}
                                >
                                    <HomeCard name={prop.name} major={prop.major} status={prop.status}/>
                                </TouchableHighlight>
                            );
                        })}
                    </SwiperFlatList>
                </Container>
            </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    swipeBox: {
        marginBottom: 10,
    },
    container: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
});

export default compose() (Home)
