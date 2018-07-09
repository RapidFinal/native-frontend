import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import {Body, CheckBox, ListItem} from "native-base";
import Modal from "react-native-modal";

class SelectCategory extends React.Component {

    static propTypes = {

    };

    state = {
        modalPageKey :'',
        isModalVisible:false,
        catData:{
            "cat1":{
                "s1":true,
                "s2":false,
                "s3":true,
                "s4":false,
                "s5":true,
                "s6":false,
                "s7":true,
                "s8":false,
                "s9":true,
                "s10":false,
            },
            "cat2":{
                "s3":false,
                "s4":false
            },
            "cat3":{
                "s5":false,
                "s6":false
            },
            "cat4":{
                "s7":false,
                "s8":false
            },
            "cat5":{
                "s9":false,
                "s10":false
            },
            "cat6":{
                "s11":false,
                "s122":false
            },
            "cat7":{
                "s13":false,
                "s14":false
            }
        }
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    _toggleCheckbox = (categoryKey, subKey) =>{
        let cloneData = this.state.catData;
        cloneData[categoryKey][subKey] = !cloneData[categoryKey][subKey]
        this.setState({catData:cloneData})

    };

    displaySubCategoriesCheckbox =()=> {
        let key = this.state.modalPageKey;
        let subData = this.state.catData[key];
        // return Object;
        return Object.keys(subData).map((data, index)=>(
            <ListItem key={index}>
                <CheckBox
                    checked={subData[data]}
                    onPress={()=>{this._toggleCheckbox(key,data)}}
                />
                <Body>
                <Text>{data}</Text>
                </Body>
            </ListItem>

        ));
    };

    displayModalContent = () =>{
        let key = this.state.modalPageKey;
        if (key && this.state.isModalVisible){
            return (

                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Text>Hide me!</Text>
                    </TouchableOpacity>
                    {this.displaySubCategoriesCheckbox()}
                </View>
            );
        }
        return (
            <View><Text>Error!</Text></View>
        );
    };

    displayCategoriesButton= () => {
        let catList = this.state.catData;
        return Object.keys(catList).map((key, index) => (
            <View key={index}>
                <Button
                    title={key}
                    color={'green'}
                    onPress={()=>{
                        this.setState({
                            modalPageKey : key
                        });
                        this._toggleModal();
                    }}/>

            </View>
        ));
    }


    render(){
        return (
            <View>
                <Text>Choose the categories and sub-categories that you looking for</Text>
                {this.displayCategoriesButton()}
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this._toggleModal}
                    styles={styles.bottomModal}>

                    {this.displayModalContent()}

                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderColor: "rgba(0, 0, 0, 0.1)",
        width : "100%",

    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
});

export default compose() (SelectCategory)
