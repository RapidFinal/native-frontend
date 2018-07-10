import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

class ProjectDetail extends React.Component {

    static propTypes = {

    }

    state = {

    }

    onPress = () => {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <TouchableOpacity
                style={styles.MainContainer}
                onPress={this.onPress}
            >
                <Text style={styles.Title}>{this.props.title}</Text>
                <Text style={styles.Description}>{this.props.description}</Text>
                <Text style={styles.Date}>{this.props.date}</Text>
            </TouchableOpacity>


        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#15BBCF'
    },

    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    Description: {
        fontSize: 16
    },

    Date: {
        fontSize: 14,
        textAlign: 'right',
        marginTop: 5,
    }
});

export default compose() (ProjectDetail)
