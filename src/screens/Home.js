import React from 'react';
import compose from 'recompose/compose'
import HomeCard from '../components/HomeCard'
import SwiperFlatList from 'react-native-swiper-flatlist';
import View_Test from './View_Test'
import PropTypes from 'prop-types'
import { SearchBar, Card } from 'react-native-elements'
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
                    // showLoadingIcon
                    onChangeText={this.onChangeText()}
                    onClear={this.onClear()}
                    searchIcon={{ size: 24 }}
                    placeholder='Search' />
                <Card>
                    <Text style={styles.titleText}>
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
                                    onPress={this.onPress()}
                                    underlayColor="#EAEAEA"
                                    key={key}
                                >
                                    <HomeCard name={prop.name} major={prop.major} status={prop.status}/>
                                </TouchableHighlight>
                            );
                        })}

                    </SwiperFlatList>
                </Card>
                <Card>
                    <Text style={styles.titleText}>
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
                                    onPress={this.onPress()}
                                    underlayColor="#EAEAEA"
                                    key={key}
                                >
                                    <HomeCard name={prop.name} major={prop.major} status={prop.status}/>
                                </TouchableHighlight>
                            );
                        })}
                    </SwiperFlatList>
                </Card>
            </ScrollView>

        )
    }

}

const styles = StyleSheet.create({
    swipeBox: {
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    titleText: {
        marginBottom: 10,
    },
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
        padding: 7,
    },
});

export default compose() (Home)
