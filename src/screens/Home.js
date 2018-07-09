import React from 'react';
import compose from 'recompose/compose'
import HomeCard from '../components/HomeCard'
import SwiperFlatList from 'react-native-swiper-flatlist';
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import {Container, Text} from "native-base";

class Home extends React.Component {

    static propTypes = {

    }

    state = {

    }

    onPress = () => {

    }

    renderCard() {
        const userInfo = [{
            name: "blue",
            major: "text1",
            status: "looking for job"
        }, {
            name: "karn",
            major: "cssss",
            status: "looking"
        }];

        cardListArr = userInfo.map((item) => {
            <TouchableHighlight
                style={styles.button}
                onPress={this.onPress}
                underlayColor="white"
            >
                <HomeCard name={item.name} major={item.major} status={item.status}></HomeCard>
            </TouchableHighlight>
        });

        return "hi";
    }

    render(){
        const { } = this.state;
        const userInfo = [
            {
                name: "blue",
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
        marginTop: 70,
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
});

export default compose() (Home)
