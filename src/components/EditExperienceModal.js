import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import TextInputWithLabel from './TextInputWithLabel';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'

class EditExperienceModal extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        updateExperience: PropTypes.func,
    }

    state = {
        modalVisible: false,
        experience: {
            name: "",
            description: "",
        },
        error: {
            flags: {
                name: false,
                description: false,
            },
            message: {
                name: "Required",
                description: "Required",
            }
        }
    }

    handleChange = (name) => (event) => {
        const experience = {...this.state.experience};
        experience[name] = event.nativeEvent.text;
        this.setState({experience});
    };

    validate = (errorField) => {
        const {name, description} = this.state.credential;
        const {experience} = this.state;
        if (experience[errorField] === '') {
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

    openModal() {
        const credential = {...this.state.experience};
        credential['firstName'] = this.props.name;
        credential['lastName'] = this.props.description;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        if (this.passAllFlags()) {
          console.log('save Experience');
            //this.saveToDB(this.state.credential.firstName, this.state.credential.lastName)
            //this.props.updateExperience(this.state.credential.firstName, this.state.credential.lastName)
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
        const {name, description} = this.state.experience
        const {message, flags} = this.state.error;
        return (
            <View style={styles.RowAlign}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        console.log('modal request closed');
                        alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TextInputWithLabel
                                label="Experience Name"
                                placeholder="Name"
                                value={name}
                                hasError={flags.name}
                                onBlur={() => this.validate("name")}
                                onChange={this.handleChange("name")}
                                errorMessage={message.name}
                            />
                            <TextInputWithLabel
                                label="Experience Description"
                                placeholder="Description"
                                value={description}
                                hasError={flags.description}
                                onBlur={() => this.validate("description")}
                                onChange={this.handleChange("description")}
                                errorMessage={message.description}
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

                {
                  //(<Text style={styles.FullNameText}>{this.props.firstName + ' ' + this.props.lastName}</Text>)
                }
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

export default compose()(EditExperienceModal)
