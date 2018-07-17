import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import TextInputWithLabel from './TextInputWithLabel';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'

class CircularProfilePhoto extends React.Component {

    static propTypes = {}

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
        const {password, confirmPassword} = this.state.credential;
        const {credential} = this.state;
        if (credential[errorField] === '') {
            this.setError(errorField, "Required")
        }
        else if (errorField === 'password' && password.length < 6) {
            this.setError(errorField, "Password minimum length is 6")
        }
        else if (errorField === 'confirmPassword' && password !== confirmPassword) {
            this.setError(errorField, "Confirm password doesn't match")
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
        db.updateEmployeeFirstName(uid, firstName)
        db.updateEmployeeLastName(uid, lastName)
    }

    render() {
        const {modalVisible} = this.state;
        const {firstName, lastName} = this.state.credential
        const {message, flags} = this.state.error;
        return (
            <View style={styles.RowAlign}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TextInputWithLabel
                                label="First name"
                                placeholder="First name"
                                value={firstName === "" ? (this.props.firstName) : (firstName)}
                                hasError={flags.firstName}
                                onBlur={() => this.validate("firstName")}
                                onChange={this.handleChange("firstName")}
                                errorMessage={message.firstName}
                            />
                            <TextInputWithLabel
                                label="Last name"
                                placeholder="Last name"
                                value={lastName === "" ? (this.props.lastName) : (lastName)}
                                hasError={flags.lastName}
                                onBlur={() => this.validate("lastName")}
                                onChange={this.handleChange("lastName")}
                                errorMessage={message.lastName}
                            />
                            <TouchableOpacity
                                onPress={() => this.save()}
                                style={styles.button}
                            >
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Text style={styles.FullNameText}>{this.props.firstName + ' ' + this.props.lastName}</Text>
                <TouchableHighlight
                    onPress={() => {
                        this.openModal();
                    }}
                >
                    <Image
                        source={require('../assets/images/edit.png')}
                        style={[styles.EditIcon, styles.FullNameEditIcon]}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        paddingTop: 15,
    },

    EditIcon: {
        width: 20,
        height: 20,
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
})

export default compose()(CircularProfilePhoto)
