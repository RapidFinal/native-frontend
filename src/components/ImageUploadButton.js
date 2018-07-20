import React from 'react';
import RNfirebase from 'react-native-firebase'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {Authentication} from '../api'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';


class ImageUploadButton extends React.Component {

  static propTypes = {
      update: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle = {styles.buttonContainer}>
        <TouchableOpacity
          style = {styles.button}
          onPress = {this.uploadImage}>
          <Icon name={"camera"} size={15} />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  /**
   * Crop and upload Image
   **/
   uploadImage(){
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

        const uid = Authentication.currentUser().uid;
        const imageRef = RNfirebase.storage().ref('profile-photo/').child(`${uid}.jpg`)

        fs.readFile(imagePath, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          return imageRef.putFile(imagePath, { contentType: mime })
        })
        .then(() => {
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          alert(url)
          this.props.update('imgUrl', url)
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
      })
    })
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 80,
  },
  button: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:35,
    height:35,
    backgroundColor:'#4286f4',
    borderRadius:70,
  }
});

export default compose()(ImageUploadButton)
