import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Modal, TouchableOpacity} from "react-native";
import {Text, Icon} from "native-base";
import TagInput from "react-native-tag-input";
import TagsSection from './TagsSection';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import SaveButton from './SaveButton';
import Tags from "react-native-tags";
import TextInputWithLabel from './TextInputWithLabel';

class EditableTags extends React.Component {

    static propTypes = {}

    state = {
        tags: [],
        text: "",
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
        let tags = this.state.tags
        this.updateTagsToDB(tags)
        this.props.updateTags(tags)
        this.setModalVisible(!this.state.modalVisible)
    }

    handleTagsChange = (tags) => {
        this.setState({tags: tags})
    }

    handleTagTextChange = (event) => {
        let tag = event.nativeEvent.text
        if (tag !== " ") {
            this.setState({text: tag});

            const lastTyped = tag.charAt(tag.length - 1);
            const parseWhen = [',', ' ', ';', '\n'];

            if (parseWhen.indexOf(lastTyped) > -1) {
                this.setState({
                    tags: [...this.state.tags, this.state.text],
                    text: "",
                });
            }
        }

    }

    render() {
        const {tags, text, modalVisible} = this.state
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
                        <Text style={styles.Title}>Edit Tags</Text>
                        <Text style={styles.Description}>Click on the tag to remove</Text>
                        <Tags
                            initialTags={tags}
                            readonly={true}
                            tagTextStyle={{fontSize: 11}}
                            onTagPress={(index) => {
                                this.removeTag(index)
                            }}
                        />
                        <TextInputWithLabel
                            label=""
                            placeholder="tags separated by space"
                            value={text}
                            onChange={this.handleTagTextChange}
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

    Title: {
        fontSize: 30,
        marginBottom: 20,
    },

    Description: {
        marginBottom: 10,
    },


});

export default compose()(EditableTags)
