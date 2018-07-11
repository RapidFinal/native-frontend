import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { TextField } from 'react-native-material-textfield';
import { Button, Divider } from 'react-native-elements';
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
          <ScrollView contentContainerStyle = {styles.container}>
            // Project Name
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Project Name </Text>
              <TextInput style = {styles.input}
               autoCapitalize = "none"
               onChangeText = {this.handleNameChange}/>
            </View>
            // Project Description
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Project Description </Text>
              <TextInput style = {styles.inputLong}
               autoCapitalize = "none"
               onChangeText = {this.handleDescriptionChange}/>
            </View>
            // Project Date
            <View style = {styles.inputContainer}>
              <Text style = {styles.inputTitle}> Date </Text>
              <TextInput style = {styles.input}
               autoCapitalize = "none"
               onChangeText = {this.handleDateChange}/>
            </View>

            <Divider style = {{marginTop: 15, marginBottom: 15, backgroundColor: 'rgba(0,0,0,0.2)'}}/>

            // Github URL
            <View style = {styles.inputContainer}>
              <View style = {styles.titleWithIconContainer}>
                <Text style = {styles.inputTitle}> Github </Text>
                <Icon name={"github"} size={20}/>
              </View>
              <TextInput style = {styles.input}
               autoCapitalize = "none"
               onChangeText = {this.handleGitUrlChange}/>
            </View>
            // Video URL
            <View style = {styles.inputContainer}>
              <View style = {styles.titleWithIconContainer}>
                <Text style = {styles.inputTitle}> Video </Text>
                <Icon name={"youtube"} size={20}/>
              </View>
              <TextInput style = {styles.input}
               autoCapitalize = "none"
               onChangeText = {this.handleVideoUrlChange}/>
            </View>

            <ScrollView contentContainerStyle = {styles.buttonContainer}>
              <TouchableOpacity
                style = {styles.button}
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
      marginBottom: 30,
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
      height: 120,
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
