import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, TouchableHighlight, Modal, TouchableOpacity} from "react-native";
import TextInputWithLabel from './TextInputWithLabel';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import {Icon} from "native-base";
import SaveButton from "./SaveButton";

class EditableCompanyName extends React.Component {

    static propTypes = {
        companyName: PropTypes.string,
        updateCompanyName: PropTypes.func,
    }

    state = {
        modalVisible: false,
        credential: {
            companyName: "",
        },
        error: {
            flags: {
                companyName: false,
            },
            message: {
                companyName: "Required",
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

    openModal() {
        const credential = {...this.state.credential};
        credential['companyName'] = this.props.companyName;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        if (this.passAllFlags()) {
            this.saveToDB(this.state.credential.companyName)
            this.props.updateCompanyName(this.state.credential.companyName)
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    saveToDB(companyName) {
        let db = new DatabaseService()
        let uid = Authentication.currentUser().uid
        db.updateEmployerCompanyName(uid,companyName)
    }

    render() {
        const {modalVisible} = this.state;
        const {companyName} = this.state.credential
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

                    <TouchableHighlight
                        style={styles.CloseIconPos}
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                    >
                        <Icon name='close' />
                    </TouchableHighlight>
                    <View style={{marginTop: 40}}>

                            <TextInputWithLabel
                                label="Company Name"
                                placeholder="Company Name"
                                value={companyName}
                                hasError={flags.companyName}
                                onBlur={() => this.validate("companyName")}
                                onChange={this.handleChange("companyName")}
                                errorMessage={message.companyName}
                            />

                            <SaveButton onPress={()=>this.save()}/>
                    </View>
                </Modal>
                <View style={styles.Inline}>
                    <Text style={
                        {fontWeight:'bold'}}
                    >
                        Work at : {this.props.companyName}
                    </Text>
                    <TouchableHighlight
                        onPress={() => {
                            this.openModal();
                        }}
                    >
                        <Icon
                            style={styles.EditIcon}
                            type="FontAwesome"
                            name='edit' />
                    </TouchableHighlight>
                </View>
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
        marginTop: 10,
    },

    Text: {
        textAlign: 'center'
    },

    EditIcon: {
        fontSize: 25,
        marginLeft: 10,
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
        position: 'absolute',
        right: 10,
        paddingRight:10,
        marginTop:10,
    },

    Inline:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between'
    },
})

export default compose()(EditableCompanyName)
