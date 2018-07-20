import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import HomeView from '../components/HomeView'
import {Text, Container} from "native-base";
import SwiperFlatList from 'react-native-swiper-flatlist'
import SearchBox from 'react-native-search-box'
import { Card } from 'react-native-elements'
import {
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DatabaseService from "../api/databaseService";
import {Authentication} from "../api";
import axios from 'axios'

class Home extends React.Component {

    static propTypes = {
        searchText: PropTypes.string,
        recentViewUsers: PropTypes.arrayOf(PropTypes.string),
    };

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Home",
        headerLeft: (
            <FontAwesome.Button
                name="navicon"
                backgroundColor="transparent"
                color="black"
                onPress={() => navigation.push("SideMenu")}
            />
        ),
        headerRight: (
            <MaterialCommunityIcons.Button
                name="account"
                backgroundColor="transparent"
                color="black"
                onPress={() => navigation.push("AccountWrapper")}/>
        ),
        headerTitleStyle: {flex: 1, textAlign: 'center'}
    });

    state = {
        searchText: '',
        recentView: [],
        recommendedUsers: [],
        showRecentView: false,
    };

    resetState() {
        this.setState({
            searchText: '',
            recentView: [],
            recommendedUsers: [],
            showRecentView: false,
        });
    }

    componentDidMount = () => {
        // console.log('hi');
        // this.fetchData();
    };

    initializeState() {
        this.resetState();
        this.fetchData();
    }

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState();
        }
    );

    fetchData = () => {
        let db = new DatabaseService;
        let currentUser;
        if (Authentication.currentUser() !== null){
            currentUser = Authentication.currentUser();
            let uid = currentUser.uid;
            this.fetchRecommended(uid);
            this.fetchRecentView(db, uid);
        } else {
            this.fetchRecommended('1');
        }
    };

    fetchRecommended = (uid) => {
        let realLink = 'https://recommendation.jobme.teparak.me/getRecommendation?uid='+uid;
        let testLink = 'http://172.20.10.2:5000/getRecommendation?uid='+uid;
        let data;
        axios.get(realLink)
            .then((response) =>  {
                // handle success
                console.log('response:', response.data);
                data = response.data;
                let dataList = []
                data.forEach(d => {
                    if (d !== 'id') {
                        dataList.push(d);
                    }
                })
                this.setState({recommendedUsers: dataList});
            })
            .catch((error) => {
                // handle error
                alert("Error loading data.");
            })
    }

    fetchRecentView = (db, uid) => {
        db.getUserRole(uid).then((result) => {
            if (result === 'employee') {
                let listView = [];
                db.getEmployeeRecentView(uid).then((result) => {
                    result.forEach(re => {
                        listView.push(re);
                    });
                    this.setState({ recentView: listView});
                    this.setShowRecentView(listView);
                })
            } else if (result === 'employer') {
                let listView = [];
                db.getEmployerRecentView(uid).then((result) => {
                    result.forEach(re => {
                        listView.push(re);
                    });
                    this.setState({ recentView: listView});
                    this.setShowRecentView(listView);
                })
            }
        });
    };

    setShowRecentView = (listView) => {
        if (listView.length > 0){
            this.setState({showRecentView: true});
        }
    }

    goToProfile = (uid) => {
        this.props.navigation.navigate("View", { uid: uid });
    };

    drawer = () => {
        this.props.navigation.openDrawer();
        console.log("drawer open")
    };

    onChangeText = (text) => {
        this.setState({ searchText: text})
    };

    onSearchButtonPress = () => {
        console.log('OnSearchPress:', this.state.searchText);
        this.props.navigation.navigate("SearchResult", { textInput: this.state.searchText });
    };

    render(){
        const {
            recentView,
            showRecentView,
            recommendedUsers
        } = this.state;
        return (
            <ScrollView>
                <SearchBox
                    placeholder="Search"
                    cancelTitle="Cancel"
                    backgroundColor="white"
                    titleCancelColor="#007AFF"
                    onChangeText={(text) => this.onChangeText(text)}
                    afterSearch={() => this.onSearchButtonPress()}
                />
                <Card containerStyle={styles.cardContainer}>
                    <Text style={styles.titleText}>
                        Recommended
                    </Text>
                    <SwiperFlatList
                        style={styles.swipeBox}
                        index={0}
                    >
                        {
                            recommendedUsers.map((prop, key) => {
                                return (
                                    <HomeView uid={prop} onPress={this.goToProfile} key={key}/>
                                )
                            })
                        }
                    </SwiperFlatList>
                </Card>
                { showRecentView ?
                    (<Card containerStyle={styles.cardContainer}>
                        <Text style={styles.titleText}>
                            Recently Viewed
                        </Text>
                        <SwiperFlatList
                            style={styles.swipeBox}
                            renderAll={true}
                            index={0}
                        >
                            {
                                recentView.map((prop, key) => {
                                    return (
                                        <HomeView uid={prop} onPress={this.goToProfile} key={key}/>
                                    )
                                })
                            }
                        </SwiperFlatList>
                    </Card>)
                    :
                    (null)
                }
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
    cardContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 10,
    }
});

export default compose() (Home)
