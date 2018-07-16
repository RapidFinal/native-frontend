import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";

class SubCategoryList extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={[styles.MainContainer, this.props.style]}>
                <Text style={styles.Title}>{this.props.title}</Text>
                {this.props.subCategory.map((value,index)=>{
                    return (
                        <Text style={styles.subCategoryItem} key={index}> {'\t\u2022'} {value.subCategoryName}</Text>
                    );
                })}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        paddingLeft: 10,
    },

    Title: {
        fontSize: 20,
        marginBottom: 3,
    },

    subCategoryItem: {
        fontSize:16,
        color: '#999999',
        margin: 1,
    }
});

export default compose() (SubCategoryList)