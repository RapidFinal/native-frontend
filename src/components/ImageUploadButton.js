import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';


class ImageUploadButton extends React.Component {

  constructor(props) {

  }

  render() {
    <TouchableOpacity
      style = {styles.button}
      onPress = {this.uploadImage}>
      <Icon name={"edit"} size={10} />
    </TouchableOpacity>
  }

  /**
   * Crop and upload Image
   **/
  const uploadImage = () => {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    return new Promise((resolve, reject) => {

      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo'
      }).then(image => {

        const imagePath = image.path

        let uploadBlob = null
        let mime = 'image/jpg'

        const sessionId = new Date().getTime()
        const imageRef = storage.ref('profile-photo').child(`${sessionId}`)

        fs.readFile(imagePath, 'base64')
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
    })
  }
}
