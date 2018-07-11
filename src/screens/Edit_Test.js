import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <ScrollView contentContainerStyle = { styles.container }>
            <TextField
              label = "Project Name"
              onChangeText = { this.handleNameChange } />
            <TextField
              label = "Project Description"
              onChangeText = { this.handleDescriptionChange } />
            <TextField
              label = "Date"
              onChangeText = { this.handleDateChange } />
            <TextField
              label = "Github"
              onChangeText = { this.handleGitUrlChange } />
            <TextField
              label = "Other"
              onChangeText = { this.handleVideoUrlChange } />

            <ScrollView contentContainerStyle = { styles.buttonContainer }>
              <TouchableOpacity
                style = { styles.button }
                onPress = {
                  () => console.log("Hello")
                }>
                <Icon name={"edit"} size={30} />
              </TouchableOpacity>
            </ScrollView>

          </ScrollView>
        );
    }

    goToProfile = () => {
      this.props.navigation.navigate("View");
    };

}

const styles = StyleSheet.create({
    container: {
      marginLeft: 20,
      marginRight: 20,
    },
    buttonContainer: {
      alignItems:'center',
      justifyContent:'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 30,
      marginBottom: 30,
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
