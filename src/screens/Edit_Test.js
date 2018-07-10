import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, ScrollView, TouchableOpacity} from "react-native";
import {TextField} from 'react-native-material-textfield';

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
            <Button
              style = { styles.button }
              title = "Save"
              onPress = {
                () => console.log("Hello")
              }>
            </Button>
          </ScrollView>
        );
    }

    goToProfile = () => {
      this.props.navigation.navigate("View");
    };

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 30,
      marginRight: 30,
    },
    button: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2679ff',
      marginTop: 20
    }
});

export default compose() (Edit_Test)
