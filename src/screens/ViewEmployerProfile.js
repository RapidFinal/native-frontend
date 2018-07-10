import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text} from "react-native";
import CategoryCard from "../components/CategoryCard";

class ViewProfile extends React.Component {

    static propTypes = {}

    state = {
        imgUrl: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        fullName: "FULLNAME",
        companyName: "MUIC Hotel",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        categories : [
            {
                categoryId: "cat1",
                categoryName:"Graphic and Design",
                subCategory:[
                    {
                        subCategoryId: "subCat1",
                        subCategoryName: "Logo"
                    },
                    {
                        subCategoryId: "subCat2",
                        subCategoryName: "Character Design"
                    },
                    {
                        subCategoryId: "subCat3",
                        subCategoryName: "Advertising Banner"
                    },
                ]
            },
            {
                categoryId: "cat2",
                categoryName:"Web and Programming",
                subCategory:[
                    {
                        subCategoryId: "subCat1",
                        subCategoryName: "HTML/CSS"
                    },
                    {
                        subCategoryId: "subCat2",
                        subCategoryName: "Web Development"
                    },
                    {
                        subCategoryId: "subCat3",
                        subCategoryName: "Mobile Application"
                    },
                ]
            }
        ],

    };

    render() {
        const {imgUrl, fullName, companyName, categories} = this.state;

        return (
            <View style={styles.MainContainer}>

                <Image source={{uri: imgUrl}}
                       style={{width: 150, height: 150, borderRadius: 150 / 2}}
                />

                <Text style={styles.ProfileName}>
                    {fullName}
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

export default compose()(ViewProfile)
