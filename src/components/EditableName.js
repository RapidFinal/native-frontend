import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import TextInputWithLabel from './TextInputWithLabel';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api';
import {Icon} from 'native-base';
import SaveButton from './SaveButton';

class EditableName extends React.Component {

    static propTypes = {
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        updateName: PropTypes.func
    }

    state = {
        modalVisible: false,
        credential: {
            firstName: "",
            lastName: "",
        },
        error: {
            flags: {
                firstName: false,
                lastName: false,
            },
            message: {
                firstName: "Required",
                lastName: "Required",
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
        credential['firstName'] = this.props.firstName;
        credential['lastName'] = this.props.lastName;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        if (this.passAllFlags()) {
            this.saveToDB(this.state.credential.firstName, this.state.credential.lastName)
            this.props.updateName(this.state.credential.firstName, this.state.credential.lastName)
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    saveToDB(firstName, lastName) {
        let db = new DatabaseService()
        let uid = Authentication.currentUser().uid
        if (this.props.userRole === 'employee') {
            db.updateEmployeeFirstName(uid, firstName)
            db.updateEmployeeLastName(uid, lastName)
        } else {
            db.updateEmployerFirstName(uid, firstName)
            db.updateEmployerLastName(uid, lastName)
        }
    }

    render() {
        const {modalVisible} = this.state;
        const {firstName, lastName} = this.state.credential
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
                            label="First name"
                            placeholder="First name"
                            value={firstName}
                            hasError={flags.firstName}
                            onBlur={() => this.validate("firstName")}
                            onChange={this.handleChange("firstName")}
                            errorMessage={message.firstName}
                        />
                        <TextInputWithLabel
                            label="Last name"
                            placeholder="Last name"
                            value={lastName}
                            hasError={flags.lastName}
                            onBlur={() => this.validate("lastName")}
                            onChange={this.handleChange("lastName")}
                            errorMessage={message.lastName}
                        />
                        <SaveButton onPress={this.save.bind(this)}/>
                    </View>
                </Modal>

                <Text style={styles.FullNameText}>{this.props.firstName + ' ' + this.props.lastName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.openModal();
                    }}
                >
                    <Icon
                        type="FontAwesome"
                        name='edit'
                        style={[styles.EditIcon, styles.FullNameEditIcon]}
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

    FullNameText: {
        fontSize: 26,
    },

    FullNameEditIcon: {
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

export default compose()(EditableName)
