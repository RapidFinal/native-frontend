import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";
import SubCategoryItem from './SubCategoryItem'

class CategoryCard extends React.Component {

    static propTypes = {}

    render() {
        const {categories} = this.props;
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Categories</Text>
                {/*{console.log(categories)}*/}
                {categories.map((value, index) => {
                    if (index === this.props.categories.length -1) {
                        return (
                            <SubCategoryItem
                                style={styles.Item}
                                title={value.categoryName}
                                subCategory={value.subCategory}
                                key={value.categoryName}
                            />
                        )
                    } else {
                        return (
                            <SubCategoryItem
                                style={[styles.Item, styles.DividerLine]}
                                title={value.categoryName}
                                subCategory={value.subCategory}
                                key={value.categoryName}
                            />
                        )
                    }
                })}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        width:'90%',
        maxWidth: '90%',
        backgroundColor: '#F3F3F3',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    Item: {
        marginBottom: 10,
    },

    DividerLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
    }
});

export default compose()(CategoryCard)
