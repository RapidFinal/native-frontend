import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Spinner} from 'native-base';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import DatabaseService from '../api/databaseService';
import {Authentication} from '../api'
import CategoryCard from "../components/CategoryCard";


const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);


class ViewEmployerProfile extends React.Component {

    static propTypes = {
        imgUrl: PropTypes.string,
        fullName: PropTypes.string,
        companyName: PropTypes.string,
        categories: PropTypes.array,
    }

    state = {
        ready: false,
        imgUrl: "",
        fullName: "",
        companyName:"",
        categories:[],
        scrollView: null

    };

    static navigationOptions = ({navigation}) => ({
        title: 'View',
        headerTitleStyle: {flex: 1, textAlign: 'center'},
        headerRight: <View></View>,
        tabBarOnPress: () => {
            if(navigation.isFocused()){
                navigation.state.params.scrollToTop()
            }
            else {
                navigation.navigate('ViewEmployer', { uid: Authentication.currentUser().uid});
            }
        }
    });

    componentDidMount() {
        this.props.navigation.setParams({
            fetchData: this.fetchData.bind(this),
            scrollToTop: this.scrollToTop.bind(this)
        })
    }

    scrollToTop() {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    }

    fetchData() {
        console.log("fetching data..")
        let db = new DatabaseService
        let  uid = this.props.navigation.getParam('uid')

        db.getEmployerInfo(uid).then((result) => {
            console.log(result)
            this.setState({
                imgUrl: result.imgUrl,
                fullName: result.firstName + ' ' + result.lastName,
                companyName:result.companyName,
                categories:result.categories,
                ready: true
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    resetState() {
        this.setState({
            ready: false,
            imgUrl: "",
            fullName: "",
            companyName:"",
            categories:[],
        })
    }

    initializeState() {
        this.resetState()
        this.fetchData()
    }

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState()
        }
    );

    render() {
        const {imgUrl, fullName, companyName, categories, ready} = this.state;
        return (

            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <CircularProfilePhoto url={imgUrl} diameter={150}/>

                            <Text style={styles.ProfileName}>{fullName}</Text>
                            <Text style={
                                {fontWeight:'bold'}}
                            >
                                Work at : {companyName}
                            </Text>

                            <CategoryCard categories={categories}/>
                        </View>
                    ) : (
                        <DataLoading/>
                    )
                }
            </ScrollView>
          )
    }
}

const styles = StyleSheet.create({
    ScrollContainer: {
        paddingVertical: 20,
    },

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ProfileName: {
        marginTop: 20,
        fontSize: 26,
    },

});

export default compose()(ViewEmployerProfile)
