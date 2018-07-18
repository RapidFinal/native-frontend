import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableOpacity, Image, Alert} from "react-native";
import DatabaseService from "../api/databaseService";
import {Authentication} from "../api";
import {Icon} from "native-base";
import {Icon as MaterialIcon} from 'react-native-elements';

class EditableProjectCard extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string
    }

    state = {
        modalVisible: false,
        credential: {
            projectId: "",
            projectName: "",
            projectDescription: "",
            projectDate: "",
        },
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    openModal() {
        const credential = {...this.state.credential};
        credential['projectId'] = this.props.projectId;
        credential['projectName'] = this.props.title;
        credential['projectDescription'] = this.props.description;
        credential['projectDate'] = this.props.date;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    attemptDelete(index, projectName) {
        Alert.alert(
            'Confirm Delete',
            'Delete ' + projectName + '?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Delete', onPress: () => this.props.deleteProject(index)},
            ],
            {cancelable: false}
        )
    }

    render() {
        const {projectId, projectName, projectDescription, projectDate} = this.state.credential
        return (
            <View
                style={styles.MainContainer}
            >
                <View style={[styles.RowAlign, styles.TitleSection]}>
                    <Text style={styles.Title}>{this.props.name}</Text>
                    <View style={[styles.RowAlign, styles.ActionIcons]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.openModal();
                            }}
                        >
                            <Icon
                                type="FontAwesome"
                                name='edit'
                                style={[styles.EditIcon, styles.EditIconPosition]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.attemptDelete(this.props.index, this.props.name);
                            }}
                        >
                            <MaterialIcon
                                name='remove-circle-outline'
                                color='#517fa4'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.Description}>{this.props.description}</Text>
                <Text style={styles.Date}>{this.props.date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#15BBCF',
        backgroundColor: '#F3F3F3',
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
    },

    EditIconPosition: {
        marginRight: 10,
    },

    EditIcon: {
        fontSize: 25,
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
    },

    TitleSection: {
        justifyContent: 'flex-start',
    },

    ActionIcons: {
        justifyContent: 'flex-end',
    }
});

export default compose()(EditableProjectCard)
