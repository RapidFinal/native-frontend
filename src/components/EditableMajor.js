import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import TextInputWithLabel from './TextInputWithLabel';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api';
import {Icon} from 'native-base';
import SaveButton from './SaveButton';

class EditableMajor extends React.Component {

    static propTypes = {
        major: PropTypes.string,
        update: PropTypes.func
    }

    state = {
        modalVisible: false,
        credential: {
            major: "",
        },
        error: {
            flags: {
                major: false,
            },
            message: {
                major: "Required",
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
            this.setError(errorField, this.state.error.message[errorField])
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
        credential['major'] = this.props.major;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        if (this.passAllFlags()) {
            this.saveToDB(this.state.credential.major)
            this.props.update('major', this.state.credential.major)
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    saveToDB(major) {
        let db = new DatabaseService()
        let uid = Authentication.currentUser().uid
        // update employee major to db here
    }

    render() {
        const {modalVisible} = this.state;
        const {major} = this.state.credential
        const {message, flags} = this.state.error;
        return (
            <View style={[styles.RowAlign, {marginTop: 10}]}>
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
                        <TextInputWithLabel
                            label="Major"
                            placeholder="Major"
                            value={major}
                            hasError={flags.major}
                            onBlur={() => this.validate("major")}
                            onChange={this.handleChange("major")}
                            errorMessage={message.major}
                        />
                        <SaveButton onPress={this.save.bind(this)}/>
                    </View>
                </Modal>

                <Text style={styles.Text}>{this.props.major}</Text>
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

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    Text: {
        fontSize: 20,
    },

    EditIconPosition: {
        marginLeft: 10,
    },

    EditIcon: {
        fontSize: 25,
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
    },

    CloseIconPos: {
        alignSelf: 'flex-end'
    }
})

export default compose()(EditableMajor)
