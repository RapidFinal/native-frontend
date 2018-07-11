import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text} from "react-native";
import CategoryCard from "../components/CategoryCard";
import DatabaseService from "../api/databaseService";
import {withContext} from "../context/withContext";

let employerInfo={};
// const uid = this.props.context.currentUser.uid;
const uid = "uid";
DatabaseService.getEmployerInfo(uid).then(data=>{
        employerInfo = data;
    });

class ViewProfile extends React.Component {

    static propTypes = {}

    state = {
        // imgUrl: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        imgUrl:employerInfo.imgUrl,
        firstName: employerInfo.firstName,
        lastName: employerInfo.lastName,
        companyName: employerInfo.companyName,
        categories : employerInfo.categories,
    };

    render() {
        const {imgUrl, firstName,lastName, companyName, categories} = this.state;

        return (
            <View style={styles.MainContainer}>
                <Image source={{uri: imgUrl}}
                       style={{width: 150, height: 150, borderRadius: 150 / 2}}
                />

                <Text style={styles.ProfileName}>
                    {firstName} {lastName}
                </Text>

                <Text style={styles.Description}>
                    Wort at {companyName}
                </Text>

                <CategoryCard categories={categories}/>

            </View>
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

export default compose(withContext)(ViewProfile)
