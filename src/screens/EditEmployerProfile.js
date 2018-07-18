import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, ScrollView} from "react-native";
import CategoryCard from "../components/CategoryCard";
import DatabaseService from "../api/databaseService";
import CircularProfilePhoto from "../components/CircularProfilePhoto";
import {Authentication} from '../api'
import EditButton from "../components/EditButton";
import {withContext} from "../context/withContext";
import hoistStatics from "recompose/hoistStatics";


class EditEmployerProfile extends React.Component {

    //Copy from ViewEmployer Profile
    static propTypes = {
        imgUrl: PropTypes.string,
        fullName: PropTypes.string,
        companyName: PropTypes.string,
        categories: PropTypes.array,
    };

    state = {
        imgUrl: "",
        fullName: "",
        companyName:"",
        categories:[],
        ready:false, //for setting spinner
    };

    componentDidMount() {
        let db = new DatabaseService
        // let uid = this.props.uid //Discuss with Hart(for now)
        // const uid = Authentication.currentUser().uid
        const {uid} = this.props.navigation.state.params
        console.log("uid",uid);
        db.getEmployerInfo(uid).then((result) => {
            this.setState({
                imgUrl: result.imgUrl,
                fullName: result.firstName + ' ' + result.lastName,
                companyName: result.companyName,
                categories: result.categories,
                ready:true,
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {imgUrl, fullName, companyName, categories} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer}>
                <View style={styles.MainContainer}>
                    <CircularProfilePhoto url={imgUrl} diameter={150}/>

                    <Text style={styles.ProfileName}>
                        {fullName}
                    </Text>

                    <Text style={styles.Description}>
                        Work at {companyName}
                    </Text>

                    <CategoryCard categories={categories}/>
                </View>
            </ScrollView>
          )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    ProfileName: {
        marginTop: 20,
        fontSize: 26,
    },

    Description: {
        marginTop: 20,
        maxWidth: '90%',
        textAlign: 'center'
    }
});

export default hoistStatics(compose(withContext))(EditEmployerProfile)
