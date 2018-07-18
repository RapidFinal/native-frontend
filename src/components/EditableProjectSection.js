import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableHighlight} from "react-native";
import {Text} from "native-base";
import EditableProjectCard from "./EditableProjectCard";
import { Icon } from 'react-native-elements'

class EditableProjectSection extends React.Component {

    static propTypes = {}

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.RowAlign}>
                    <Text style={styles.Title}>Projects</Text>
                    <TouchableHighlight
                        onPress={() => {
                            // Call add project here
                        }}
                    >
                        <Icon
                            name='add-circle-outline'
                            color='#517fa4'
                        />
                    </TouchableHighlight>
                </View>
                {
                    this.props.projects.map((value, index) => {
                        return (
                            <EditableProjectCard name={value.name}
                                         description={value.description}
                                         date={value.date}
                                         projectId={value.id}
                                         index={index}
                                         deleteProject={this.props.deleteProject}
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
        marginRight: 10,
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default compose()(EditableProjectSection)
