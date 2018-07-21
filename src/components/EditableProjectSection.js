import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, Modal, TextInput, ScrollView, TouchableOpacity, Image, Alert} from "react-native";
import DatabaseService from "../api/databaseService";
import EditableProjectCard from "./EditableProjectCard";
import SaveButton from './SaveButton';
import Tags from "react-native-tags";
import DatePicker from 'react-native-datepicker';
import { Button, Divider } from 'react-native-elements';
import TextInputWithLabel from './TextInputWithLabel';
import {Icon as MaterialIcon} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Authentication} from "../api";

class EditableProjectSection extends React.Component {

      static propTypes = {
          name: PropTypes.string,
          description: PropTypes.string,
          date: PropTypes.string
      }

      state = {
          text: "",
          modalVisible: false,
          credential: {
              projectName: "",
              projectDescription: "",
              projectDate: "",
              projectGit: "",
              projectVideo: "",
              projectTags: []
          },
          error: {
              flags: {
                  projectName: false,
                  projectDescription: false,
                  projectDate: false,
                  projectGit: false,
                  projectVideo: false,
              },
              message: {
                  projectName: "Required",
                  projectDescription: "Required",
                  projectDate: "Required",
                  projectGit: "Required",
                  projectVideo: "Required",
              }
          }
      }

      handleChange = (name) => (event) => {
          const credential = {...this.state.credential};
          credential[name] = event.nativeEvent.text;
          this.setState({credential});
      };

      handleDateChange = (date) => {
          //console.log(date);
          const credential = {...this.state.credential};
          credential["projectDate"] = date;
          this.setState({credential})
      }

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
          this.setModalVisible(!this.state.modalVisible)
      }

      closeModal() {
          this.setModalVisible(!this.state.modalVisible)
      }

      save() {
          const allLinks = {github: this.state.credential.projectGit,
                            youtube: this.state.credential.projectVideo}
          this.saveToDB(this.state.credential.projectName, this.state.credential.projectDescription,
                        this.state.credential.projectDate, this.state.credential.projectTags, allLinks)

          let db = new DatabaseService
          let uid = Authentication.currentUser().uid
          db.getEmployeeInfo(uid).then((result) => {
              this.props.updateProjects(result.projects)
          }).catch((error) => {
              alert(error)
          })
          this.setModalVisible(!this.state.modalVisible)
      }

      saveToDB(projectName, projectDescription, projectDate, projectTags, projectLinks) {
          let db = new DatabaseService()
          let uid = Authentication.currentUser().uid
          db.createEmployeeProjects(uid, projectName, projectDescription, projectDate, projectTags, projectLinks);
          alert("UID: " + uid + "\n" +
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
          this.setState({
            credential: {
              projectTags: tags
            }
          })
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
                        projectName: this.state.credential.projectName,
                        projectDescription: this.state.credential.projectDescription,
                        projectDate: this.state.credential.projectDate,
                        projectGit: this.state.credential.projectGit,
                        projectVideo: this.state.credential.projectVideo,
                        projectTags: [...this.state.credential.projectTags, this.state.text]
                      }
                  });
              }
          }
      }

    render() {
        const {modalVisible, text} = this.state;
        const {projectName, projectDescription, projectDate, projectGit, projectVideo, projectTags} = this.state.credential
        const {message, flags} = this.state.error;
        return (
            <View style={styles.MainContainer}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {this.closeModal();}}>
                    <ScrollView contentContainerStyle = {styles.MainContainer}>
                      <TouchableOpacity
                          style={styles.CloseIconPos}
                          onPress={() => {
                              this.closeModal();
                          }}
                      >
                          <MaterialIcon name='close'/>
                      </TouchableOpacity>
                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> Project Name </Text>
                        <TextInputWithLabel
                            placeholder="Project Name"
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
                            placeholder="Project Description"
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
                          format="DD/MM/YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          showIcon={false}
                          onDateChange = {this.handleDateChange}
                          />
                      </View>

                      <Divider style = {{marginTop: 15, marginBottom: 15, backgroundColor: 'rgba(0,0,0,0.2)'}}/>

                      <View style = {styles.inputContainer}>
                        <View style = {styles.titleWithIconContainer}>
                          <Text style = {styles.inputTitle}> Git </Text>
                          <Icon name={"github"} size={20}/>
                        </View>
                        <TextInputWithLabel
                            placeholder="Project Git"
                            value={projectGit}
                            hasError={flags.projectGit}
                            onBlur={() => this.validate("projectGit")}
                            onChange={this.handleChange("projectGit")}
                            errorMessage={message.projectGit}
                        />
                      </View>
                      <View style = {styles.inputContainer}>
                        <View style = {styles.titleWithIconContainer}>
                          <Text style = {styles.inputTitle}> Video </Text>
                          <Icon name={"youtube"} size={20}/>
                        </View>
                        <TextInputWithLabel
                            placeholder="Project Video"
                            value={projectVideo}
                            hasError={flags.projectVideo}
                            onBlur={() => this.validate("projectVideo")}
                            onChange={this.handleChange("projectVideo")}
                            errorMessage={message.projectVideo}
                        />
                      </View>
                      <View style = {styles.inputContainer}>
                        <Text style = {styles.inputTitle}> #Tags </Text>
                        <Tags
                            initialTags={projectTags}
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

                    </ScrollView>
                </Modal>
                <View style={styles.RowAlign}>
                    <Text style={styles.Title}>Projects</Text>
                    <TouchableOpacity
                        onPress={() => {this.openModal();}}
                    >
                        <MaterialIcon
                            name='add-circle-outline'
                            color='#517fa4'
                        />
                    </TouchableOpacity>
                </View>
                {
                    this.props.projects.map((item, index) => {
                        return (
                            <EditableProjectCard projectName={item.name}
                                                  projectId={item.id}
                                                  projectDescription={item.description}
                                                  projectDate={item.date}
                                                  projectTags={item.tags}
                                                  index={index}
                                                  updateProjects={this.props.updateProjects}
                                                  deleteProject={this.props.deleteProject}
                                                  key={item.id}
                            />
                        )
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        maxWidth: '90%',
        width: '90%',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 10,
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
    titleWithIconContainer: {
      flexDirection: 'row'
    },
});

export default compose()(EditableProjectSection)
