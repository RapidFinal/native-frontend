import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView} from "react-native";
import {Text} from "native-base";
import DatabaseService from "../api/databaseService";
import EditableProjectCard from "./EditableProjectCard";

class StatusDropdown extends React.Component {

    static propTypes = {}

    state = {}

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Projects</Text>
                {
                    this.props.projects.map((value, index) => {
                        return (
                            <EditableProjectCard title={value.name}
                                         description={value.description}
                                         date={value.date}
                                         projectId={value.id}
                                         key={value.id}
                            />
                        )
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        maxWidth: '90%',
        width: '90%',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

export default compose()(StatusDropdown)
