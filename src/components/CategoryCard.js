import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, Button, TouchableHighlight} from "react-native";
import SubCategoryItem from './SubCategoryList'
import {Icon, Toast} from "native-base";
import CategoriesSelection from "./CategoriesSelection";
import SaveButton from "./SaveButton";
import DatabaseService from "../api/databaseService";

import Modal from "react-native-modal";

class CategoryCard extends React.Component {

    static propTypes = {
        editable:PropTypes.bool,
        updateCategories:PropTypes.func,
        userRole:PropTypes.string,
    }

    state = {
        isModalVisible:false,
        selectedCategories:{},
    }

    openModal(){
        this.setState({
            isModalVisible:true
        })
    }

    closeModal(){
        this.setState({
            isModalVisible:false
        })
    }

    setSelectedState = (selected) => {
        this.setState({
            selectedCategories: selected
        })
    }

    save(){
        const {uid,userRole} = this.props
        const {selectedCategories}= this.state
        console.log(selectedCategories)
        if (Object.keys(selectedCategories).length <1){
            Toast.show({
                text: "Please select at least one category!",
                buttonText: "Okay",
                duration: 3000,
            })
            this.closeModal()
            return;
        }


        let db= new DatabaseService;

        if(userRole==="employee"){
            db.updateEmployeeCategories(uid,selectedCategories)
            db.getEmployeeInfo(uid).then(result=>{
                this.props.updateCategories(result.categories)
            })
        }
        else{
            db.updateEmployerCategories(uid,selectedCategories)
            db.getEmployerInfo(uid).then(result=>{
                this.props.updateCategories(result.categories)
            })
        }

        this.closeModal()
    }


    render() {
        const {isModalVisible} = this.state;
        const {categories,editable,uid,userRole} = this.props;
        return (
            <View style={styles.MainContainer}>
                <View style={styles.Inline}>
                    <Text style={styles.Title}>Categories</Text>

                    {editable ? (
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.openModal();
                                }}
                            >
                                <Icon
                                    style={styles.EditIcon}
                                    type="FontAwesome"
                                    name='edit' />
                            </TouchableHighlight>
                            <Modal
                                style={styles.Modal}
                                isVisible={isModalVisible}
                                // onBackdropPress={()=>this.closeModal()}
                            >
                                <View style={styles.ModalContent}>
                                    <TouchableHighlight
                                        style={styles.CloseIconPos}
                                        onPress={() => {
                                            this.closeModal();
                                        }}
                                    >
                                        <Icon name='close' />
                                    </TouchableHighlight>

                                    <View style={{
                                        marginTop:40,
                                    }}>

                                        <CategoriesSelection
                                            uid={uid}
                                            userRole={userRole}
                                            setSelectedState={this.setSelectedState}
                                        />
                                    </View>

                                    <SaveButton onPress={()=>this.save()}/>
                                </View>
                            </Modal>
                        </View>
                    ) : (null)}
                </View>

                {categories.map((value, index) => {
                    if (index === this.props.categories.length -1) {
                        return (
                            <SubCategoryItem
                                style={styles.Item}
                                title={value.categoryName}
                                subCategory={value.subCategory}
                                key={value.categoryName}
                            />
                        )
                    } else {
                        return (
                            <SubCategoryItem
                                style={[styles.Item, styles.DividerLine]}
                                title={value.categoryName}
                                subCategory={value.subCategory}
                                key={value.categoryName}
                            />
                        )
                    }
                })}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        width:'90%',
        maxWidth: '90%',
        backgroundColor: '#F3F3F3',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    Item: {
        marginBottom: 10,
    },

    DividerLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
    },

    EditIcon:{
        marginTop: 5,
        fontSize: 25,
    },

    CloseIconPos: {
        position: 'absolute',
        right: 10,
        paddingRight:10,
        marginTop:10,
    },

    Inline:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-between'
    },

    Modal:{
        backgroundColor:'white',
        margin:0
    },

    ModalContent:{
        flex:1,
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    }

});

export default compose()(CategoryCard)
