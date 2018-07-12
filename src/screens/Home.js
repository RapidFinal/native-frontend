import React from 'react';
import compose from 'recompose/compose'
import HomeCard from '../components/HomeCard'
import SwiperFlatList from 'react-native-swiper-flatlist';
import SearchBox from 'react-native-search-box';
import { Card } from 'react-native-elements'
import { StyleSheet, ScrollView, TouchableHighlight, Button, View, Dimensions } from 'react-native';
import { Text } from "native-base";

class Home extends React.Component {

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    goToProfile(userID) {
        this.props.navigation.navigate("Profile", { userID: userID});
    };

    onSearchButtonPress = (text) => {
        const formatText = text.toLowerCase();
        this.props.navigation.navigate("View", { textInput: formatText });
    }

    render(){
        const { } = this.state;
        const userInfo = [
            {
                userID: 1,
                name: "Pan",
                major: "text1",
                status: "looking for job"
            },
            {
                userID: 2,
                name: "karn",
                major: "cssss",
                status: "looking"
            },
            {
                userID: 3,
                name: "sea",
                major: "bba",
                status: "not looking"
            },
            {   userID: 4,
                name: "ice",
                major: "cssss",
                status: "looking yo"
            },
            {
                userID: 5,
                name: "pan",
                major: "bba yo",
                status: "not looking HA"
            }
        ];
        return (
            <ScrollView>
                <SearchBox
                    placeholder="Search"
                    cancelTitle="Cancel"
                    backgroundColor="white"
                    titleCancelColor="#007AFF"
                    afterSearch={() => this.onSearchButtonPress()}
                />
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
                                    onPress={() => this.goToProfile(prop.userID)}
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
                                    onPress={() => this.goToProfile(prop.userID)}
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
    inline: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
        padding: 7,
    },
});

export default compose() (Home)
