import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import {Text} from "native-base";
import {Icon} from 'react-native-elements'
import Tags from "react-native-tags";
import TagsSection from './TagsSection';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'

class EditableTags extends React.Component {

    static propTypes = {}

    state = {
        tags: [],
        modalVisible: false,
        initialText: ""
    }

    openModal() {
        this.setState({
            tags: this.props.tags
        })
        this.setModalVisible(!this.state.modalVisible)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    handleTagsChange = (tags) => {
        this.setState({tags: tags})
        this.updateTagsToDB(tags)
        this.props.updateTags(tags)
    }

    updateTagsToDB(tags) {
        let db = new DatabaseService
        let uid = Authentication.currentUser().uid
        db.updateEmployeeTags(uid, tags)
    }

    removeTag = (tagIndex) => {
        let tagList = this.state.tags;
        if (tagIndex !== -1) tagList.splice(tagIndex, 1);
        this.handleTagsChange(tagList);
    }

    render() {
        const {tags, modalVisible, initialText} = this.state
        return (
            <View style={[styles.CenterAlign]}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Edit Tags</Text>
                            <Tags
                                initialText=""
                                initialTags={tags}
                                onChangeTags={tags => this.handleTagsChange(tags)}
                                onTagPress={(index, tagLabel, event) => this.removeTag(index)}
                                containerStyle={{ justifyContent: "center" }}
                                inputStyle={{ backgroundColor: "white" }}
                            />
                            <TouchableOpacity
                                onPress={}
                                style={styles.button}
                            >
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TagsSection tags={this.props.tags}/>
                <TouchableHighlight
                    onPress={() => {
                        this.openModal()
                    }}
                >
                    <Icon
                        type="FontAwesome"
                        name='edit'
                    />
                </TouchableHighlight>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    CenterAlign: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        alignSelf: 'center',
        marginVertical: 40,
        width: 120,
        height: 30,
        backgroundColor: '#8BD2EB',
    },

    saveText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff'
    }
});

export default compose()(EditableTags)
