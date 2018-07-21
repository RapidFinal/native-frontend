import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, Modal, TextInput, ScrollView, TouchableOpacity, Image, Alert} from "react-native";
import DatabaseService from "../api/databaseService";
import {Authentication} from "../api";
import {Icon} from "native-base";
import {Icon as MaterialIcon} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { Button, Divider } from 'react-native-elements';
import TagInput from "react-native-tag-input";
import Tags from "react-native-tags";
import TextInputWithLabel from './TextInputWithLabel';
import SaveButton from './SaveButton';

class EditableProjectCard extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string
    }

    state = {
        text: "",
        modalVisible: false,
        credential: {
            projectId: "",
            projectName: "",
            projectDescription: "",
            projectDate: "",
            projectTags: []
        },
        error: {
            flags: {
                projectName: false,
                projectDescription: false,
                projectDate: false,
            },
            message: {
                projectName: "Required",
                projectDescription: "Required",
                projectDate: "Required"
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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

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

    openModal() {
        const credential = {...this.state.credential};
        credential['projectId'] = this.props.projectId;
        credential['projectName'] = this.props.title;
        credential['projectDescription'] = this.props.description;
        credential['projectDate'] = this.props.date;
        credential['projectTags'] = this.props.tags;
        this.setState({credential});
        this.setModalVisible(!this.state.modalVisible)
    }

    closeModal() {
        this.setModalVisible(!this.state.modalVisible)
    }

    save() {
        this.saveToDB(this.props.projectId, this.state.credential.projectName, this.state.credential.projectDescription,
                      this.state.credential.projectDate, this.state.credential.projectTags)

        let db = new DatabaseService
        let uid = Authentication.currentUser().uid
        db.getEmployeeInfo(uid).then((result) => {
            this.props.updateProjects(result.projects)
        }).catch((error) => {
            alert(error)
        })
        this.setModalVisible(!this.state.modalVisible)
    }

    saveToDB(projectId, projectName, projectDescription, projectDate, projectTags) {
        let db = new DatabaseService()
        let uid = Authentication.currentUser().uid
        db.updateEmployeeProject(uid, projectId, projectName, projectDescription, projectDate, projectTags);
        alert("UID: " + uid + "\n" +
              "PROJECT ID: " + projectId + "\n" +
              "PROJECT NAME: " + projectName + "\n" +
              "PROJECT DESC: " + projectDescription + "\n" +
              "PROJECT DATE: " + projectDate + "\n" +
              "PROJECT TAGS: " + projectTags)
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

    removeTag = (tagIndex) => {
        let tagList = this.state.credential.projectTags;
        if (tagIndex !== -1) tagList.splice(tagIndex, 1);
        this.handleTagsChange(tagList);
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
                    text: "",
                    credential: {
                      projectTags: [...this.state.credential.projectTags, this.state.text]
                    }
                });
            }
        }
    }

    render() {
        const {modalVisible, text} = this.state;
        const {projectId, projectName, projectDescription, projectDate, projectTags} = this.state.credential
        const {message, flags} = this.state.error;
        return (
            <View style={styles.MainContainer}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View contentContainerStyle = {styles.MainContainer}>
                      <TouchableOpacity
                          style={styles.CloseIconPos}
                          onPress={() => {
                              this.closeModal();
                          }}
                      >
                          <Icon name='close'/>
                      </TouchableOpacity>
                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> Project Name </Text>
                        <TextInputWithLabel
                            placeholder={this.props.projectName}
                            value={projectName}
                            hasError={flags.projectName}
                            onBlur={() => this.validate("projectName")}
                            onChange={this.handleChange("projectName")}
                            errorMessage={message.projectName}
                        />
                      </View>
                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> Project Description </Text>
                        <TextInputWithLabel
                            placeholder={this.props.projectDescription}
                            value={projectDescription}
                            hasError={flags.projectDescription}
                            onBlur={() => this.validate("projectDescription")}
                            onChange={this.handleChange("projectDescription")}
                            errorMessage={message.projectDescription}
                        />
                      </View>
                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> Date </Text>
                        <DatePicker
                          style = {styles.dateInput}
                          date = {projectDate}
                          mode="date"
                          placeholder="select date"
                          format="DD-MM-YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          showIcon={false}
                          onDateChange = {this.handleDateChange}
                          />
                      </View>

                      <Divider style = {{marginTop: 15, marginBottom: 15, backgroundColor: 'rgba(0,0,0,0.2)'}}/>

                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> #Tags </Text>
                        <Tags
                            initialTags={this.props.projectTags}
                            readonly={true}
                            tagTextStyle={{fontSize: 11}}
                            onTagPress={(index) => { this.removeTag(index) }}
                        />
                        <TextInputWithLabel
                            label=""
                            placeholder="tags separated by space"
                            value={text}
                            onChange={this.handleTagTextChange}
                        />
                      </View>
                      <SaveButton onPress={this.save.bind(this)}/>

                    </View>
                </Modal>

                <View style={[styles.RowAlign, styles.TitleSection]}>
                    <Text style={styles.Title}>{this.props.projectName}</Text>
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
                                this.attemptDelete(this.props.index, this.props.projectName);
                            }}
                        >
                            <MaterialIcon
                                name='remove-circle-outline'
                                color='#921100'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.Description}>{this.props.projectDescription}</Text>
                <Text style={styles.Date}>{this.props.projectDate}</Text>
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
    },
    buttonContainer: {
      alignItems:'center',
      justifyContent:'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 30,
      marginBottom: 80,
    },
    inputContainer: {
      marginTop: 10
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor:'#fff',
      borderWidth: 1
    },
    inputLong: {
      margin: 15,
      minHeight: 40,
      height: 'auto',
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor:'#fff',
      borderWidth: 1
    },
    inputTitle: {
      fontWeight: 'bold',
      fontSize: 14
    },
    titleWithIconContainer: {
      flexDirection: 'row'
    },
    dateInput: {
      margin: 15,
      height: 40,
      borderColor: 'rgba(0,0,0,0.2)',
      backgroundColor:'#fff'
    },
    button: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      height:70,
      backgroundColor:'#fff',
      borderRadius:70,
    },
    CloseIconPos: {
        alignSelf: 'flex-end'
    },
});

export default compose()(EditableProjectCard)
