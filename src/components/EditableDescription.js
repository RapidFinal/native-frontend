import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, TouchableHighlight, Modal} from "react-native";
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import TextInputMultipleLineWithLabel from '../components/TextInputMultipleLineWithLabel';
import {Icon} from 'react-native-elements'
import SaveButton from './SaveButton';

class EditableDescription extends React.Component {

    static propTypes = {
        description: PropTypes.string,
        update: PropTypes.func,
    }

    state = {
        modalVisible: false,
        credential: {
            description: "",
        },
        error: {
            flags: {
                description: false,
            },
            message: {
                description: "Required",
            }
        }
    }

    handleChange = (name) => (event) => {
        const credential = {...this.state.credential};
        credential[name] = event.nativeEvent.text;
        this.setState({credential});
    };

    validate = (errorField) => {
        const {credential} = this.state;
        if (credential[errorField] === '') {
            this.setError(errorField, "Required")
        }
        else if (errorField === 'description' && credential[errorField].length > 120) {
            this.setError(errorField, "Length exceed 120 characters")
        }
        else {
            this.setError(errorField, null)
        }
    };

    setError = (errorField, message) => {
        const error = {...this.state.error};
        if (message !== null) {
            error.flags[errorField] = true;
            error.message[errorField] = message;
            this.setState({error})
        }
        else {
            error.flags[errorField] = false;
            this.setState({error})
        }
    };

    passAllFlags = () => {
        const {credential, error} = this.state;
        let flag = true;
        Object.keys(error.flags).forEach(errorField => {
            if (credential[errorField] === '') {
                this.validate(errorField);
                flag = false;
            }
        });
        return flag;
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    closeModal() {
        this.setModalVisible(!this.state.modalVisible)
    }

    openModal() {
        const credential = {...this.state.credential};
        credential['description'] = this.props.description;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        if (this.passAllFlags()) {
            this.saveToDB(this.state.credential.description)
            this.props.update('description', this.state.credential.description)
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    saveToDB(description) {
        let db = new DatabaseService()
        let uid = Authentication.currentUser().uid
        db.updateEmployeeDescription(uid, description)
    }

    render() {
        const {modalVisible} = this.state;
        const {description} = this.state.credential
        const {message, flags} = this.state.error;
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
                        <TouchableHighlight
                            style={styles.CloseIconPos}
                            onPress={() => {
                                this.closeModal();
                            }}
                        >
                            <Icon name='close'/>
                        </TouchableHighlight>
                        <TextInputMultipleLineWithLabel
                            label="Description"
                            placeholder="Description"
                            hasError={flags.description}
                            multiline={true}
                            onChange={this.handleChange("description")}
                            value={description}
                            editable={true}
                            maxLength={120}
                            onBlur={() => this.validate("description")}
                            errorMessage={message.description}
                        />
                        <SaveButton onPress={this.save.bind(this)}/>
                    </View>
                </Modal>

                <Text style={styles.Text}>
                    {this.props.description}
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        this.openModal();
                    }}
                >
                    <Image
                        source={require('../assets/images/edit.png')}
                        style={styles.EditIcon}
                    />
                </TouchableHighlight>
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
        marginTop: 10,
    },

    Text: {
        textAlign: 'center'
    },

    EditIcon: {
        width: 20,
        height: 20,
        marginTop: 15,
    },

    CloseIconPos: {
        alignSelf: 'flex-end'
    }
})

export default compose()(EditableDescription)
