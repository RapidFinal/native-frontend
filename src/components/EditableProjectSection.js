import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableOpacity} from "react-native";
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
                    <TouchableOpacity
                        onPress={() => {
                            // Call add project here
                        }}
                    >
                        <Icon
                            name='add-circle-outline'
                            color='#517fa4'
                        />
                    </TouchableOpacity>
                </View>
                {
                    this.props.projects.map((item, index) => {
                        return (
                            <EditableProjectCard projectName={item.name}
                                                  projectId={item.id}
                                                  projectDescription={item.description}
                                                  projectDate={item.date}
                                                  projectTags={item.tags}
                                                  index={index}
                                                  updateProjects={this.props.updateProjects}
                                                  deleteProject={this.props.deleteProject}
                                                  key={item.id}
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
        alignItems: 'center'
    },
});

export default compose()(EditableProjectSection)
