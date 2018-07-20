import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import RecentView from '../components/RecentView'
import {Text, Container} from "native-base";
import HomeCard from '../components/HomeCard'
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
        showRecentView: false,
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        let db = new DatabaseService;
        let currentUser;
        if (Authentication.currentUser() !== null){
            currentUser = Authentication.currentUser();
            this.fetchRecentView(db, currentUser.ui);
        }
    };

    fetchRecentView(db, uid) {
        db.getUserRole(uid).then((result) => {
            if (result === 'employee') {
                let listView = [];
                db.getEmployeeRecentView(uid).then((result) => {
                    result.forEach(re => {
                        listView.push(re);
                    });
                    this.setState({ recentView: listView});
                })
            } else if (result === 'employer') {
                let listView = [];
                db.getEmployeeRecentView(uid).then((result) => {
                    result.forEach(re => {
                        listView.push(re);
                    });
                    this.setState({ recentView: listView});
                })
            }
        });
        if (this.state.recentView !== []){
            this.setState({showRecentView: true});
        }
    };

    goToProfile = (userID) => {
        this.props.navigation.navigate("View", { userID: userID });
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
            showRecentView
        } = this.state;

        const userInfo = [
            {
                uid: 1,
                name: "Pan",
                major: "text1",
                status: "looking for job"
            },
            {
                uid: 2,
                name: "karn",
                major: "cssss",
                status: "looking"
            },
            {
                uid: 3,
                name: "sea",
                major: "bba",
                status: "not looking"
            },
            {   uid: 4,
                name: "ice",
                major: "cssss",
                status: "looking yo"
            },
            {
                uid: 5,
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
                        {userInfo.map((prop, key) => {
                            return (
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={() => this.goToProfile(prop.uid)}
                                    underlayColor="#EAEAEA"
                                    key={key}
                                >
                                    <HomeCard name={prop.name} major={prop.major} status={prop.status}/>
                                </TouchableHighlight>
                            );
                        })}
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
                                        <RecentView userId={prop} onPress={this.goToProfile} key={key}/>
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
