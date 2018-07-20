import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { TextField } from 'react-native-material-textfield';
import { Button, Divider } from 'react-native-elements';
import Tags from "react-native-tags";
import TagInput from "react-native-tag-input";
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import RNFetchBlob from 'react-native-fetch-blob'


class ImageUploadButton extends React.Component {

  constructor(props) {

  }

  render() {
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
      <Icon name={"edit"} size={10} />
    </TouchableOpacity>
  }

  const Blob = RNFetchBlob.polyfill.Blob
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        const imageRef = storage.ref('profile-photo').child(`${sessionId}`)

        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
