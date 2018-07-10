import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button} from "react-native";

class CategoryItem extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <View style={[styles.MainContainer, this.props.style]}>
                <Text style={styles.Title}>{this.props.title}</Text>
                {this.props.subCategory.map((value,index)=>{
                    return (
                        <Text style={styles.Description} key={index}>- {value.subCategoryName}</Text>
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

    Description: {
        color: '#999999',
    }
});

export default compose() (CategoryItem)
