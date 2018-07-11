import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { TextField } from 'react-native-material-textfield';
import { Button, Divider } from 'react-native-elements';
import Tags from "react-native-tags";
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

class Edit_Test extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        projectName: '',
        projectDescription: '',
        projectDate: '',
        projectGit: '',
        projectVideo: '',
        projectTags: []
      }
    }

    handleNameChange = (name) => {
      this.setState({ projectName: name })
    }

    handleDescriptionChange = (description) => {
      this.setState({ projectDescription: description })
    }

    handleDateChange = (date) => {
      this.setState({ projectDate: date })
    }

    handleGitUrlChange = (url) => {
      this.setState({ projectGit: url })
    }

    handleVideoUrlChange = (url) => {
      this.setState({ projectVideo: url })
    }

    handleTagsChange = (tags) => {
      this.setState({ projectTags: tags })
    }

    render(){
        return (
          <ScrollView contentContainerStyle = {styles.container}>
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Project Name </Text>
              <TextInput style = {styles.input}
                autoCapitalize = "none"
                onChangeText = {this.handleNameChange}/>
            </View>
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Project Description </Text>
              <TextInput style = {styles.inputLong}
                autoCapitalize = "none"
                multiline = {true}
                onChangeText = {this.handleDescriptionChange}/>
            </View>
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Date </Text>
              <DatePicker
                style = {styles.dateInput}
                date = {this.state.projectDate}
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
              <View style = {styles.titleWithIconContainer}>
                <Text style = {styles.inputTitle}> Github </Text>
                <Icon name={"github"} size={20}/>
              </View>
              <TextInput style = {styles.input}
                autoCapitalize = "none"
                onChangeText = {this.handleGitUrlChange}/>
            </View>
            <View style = {styles.inputContainer}>
              <View style = {styles.titleWithIconContainer}>
                <Text style = {styles.inputTitle}> Video </Text>
                <Icon name={"youtube"} size={20}/>
              </View>
              <TextInput style = {styles.input}
                autoCapitalize = "none"
                onChangeText = {this.handleVideoUrlChange}/>
            </View>
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> #Tags </Text>
              <Tags
                initialText="C++"
                initialTags={["Java","Python","NodeJs"]}
                containerStyle={{justifyContent: "center"}}
                onChangeTags={this.handleTagsChange}
                onTagPress={(index, tagLabel, event) => this.removeTag(index)}
              />
            </View>

            <ScrollView contentContainerStyle = {styles.buttonContainer}>
              <TouchableOpacity
                style = {styles.button}
                /**
                 * Placeholder for database function call
                 */
                onPress = {
                  () => alert("Project Name: " + this.state.projectName + "\n" +
                              "Project Description: " + this.state.projectDescription + "\n" +
                              "Project Date: " + this.state.projectDate + "\n" +
                              "Project Git: " + this.state.projectGit + "\n" +
                              "Project Youtube: " + this.state.projectVideo + "\n" +
                              "Project Tags: " + this.state.projectTags)
                }>
                <Icon name={"plus"} size={4 0} />
              </TouchableOpacity>
            </ScrollView>

          </ScrollView>
        );
    }

    goToProfile = () => {
      this.props.navigation.navigate("View");
    };

    removeTag = (tagIndex) => {
      var tagList = this.state.projectTags;
      if (tagIndex !== -1) tagList.splice(tagIndex, 1);
      this.handleTagsChange(tagList);
    }

}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
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
    }
});

export default compose() (Edit_Test)
