import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Modal, TouchableOpacity} from "react-native";
import {Text, Icon} from "native-base";
import Tags from "react-native-tags";
import TagsSection from './TagsSection';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import SaveButton from './SaveButton';

class EditableTags extends React.Component {

    static propTypes = {}

    state = {
        tags: [],
        modalVisible: false,
    }

    closeModal() {
        this.setModalVisible(!this.state.modalVisible)
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

    save() {
        this.setModalVisible(!this.state.modalVisible)
    }

    render() {
        const {tags, modalVisible} = this.state
        return (
            <View style={styles.CenterAlign}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={[styles.MainContainer]}>
                        <TouchableOpacity
                            style={styles.CloseIconPos}
                            onPress={() => {
                                this.closeModal();
                            }}
                        >
                            <Icon name='close'/>
                        </TouchableOpacity>
                        <Text>Edit Tags</Text>
                        <Tags
                            initialText=""
                            initialTags={tags}
                            onChangeTags={tags => this.handleTagsChange(tags)}
                            onTagPress={(index, tagLabel, event) => this.removeTag(index)}
                            containerStyle={{justifyContent: "center"}}
                            inputStyle={{backgroundColor: "white"}}
                        />
                        <SaveButton onPress={this.save.bind(this)}/>
                    </View>
                </Modal>

                <TagsSection tags={this.props.tags}/>
                <TouchableOpacity
                    onPress={() => {
                        this.openModal()
                    }}
                >
                    <Icon
                        type="FontAwesome"
                        name='edit'
                        style={[styles.EditIcon, styles.EditIconPosition]}
                    />
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        width: '90%',
        maxWidth: '90%',
        marginTop: 20,
        alignSelf: 'center'
    },

    CenterAlign: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    EditIconPosition: {
        marginTop: 10,
    },

    EditIcon: {
        fontSize: 25,
    },

    CloseIconPos: {
        alignSelf: 'flex-end'
    },
});

export default compose()(EditableTags)
