import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button, Container} from "native-base";
import Modal from "react-native-modal";
import {withContext} from "../context/withContext";
import DatabaseService from "../api/databaseService";

const categories=[];
DatabaseService.getAllCategories().then(data=>{
    categories = data;
});

class CategoriesSelection extends React.Component {

    static propTypes = {

    };

    state = {
        currentCategoryIndex : null,
        currentCategoryId :'',
        isModalVisible:false,
        // categories : [
        //     {
        //         categoryId: "cat1",
        //         categoryName:"Graphic and Design",
        //         subCategory:[
        //             {
        //                 subCategoryId: "subCat1",
        //                 subCategoryName: "Logo"
        //             },
        //             {
        //                 subCategoryId: "subCat2",
        //                 subCategoryName: "Character Design"
        //             },
        //             {
        //                 subCategoryId: "subCat3",
        //                 subCategoryName: "Advertising Banner"
        //             },
        //         ]
        //     },
        //     {
        //         categoryId: "cat2",
        //         categoryName:"Web and Programming",
        //         subCategory:[
        //             {
        //                 subCategoryId: "subCat1",
        //                 subCategoryName: "HTML/CSS"
        //             },
        //             {
        //                 subCategoryId: "subCat2",
        //                 subCategoryName: "Web Development"
        //             },
        //             {
        //                 subCategoryId: "subCat3",
        //                 subCategoryName: "Mobile Application"
        //             },
        //         ]
        //     }
        // ],
        categories: categories,

        selectedCategories:this.props.context.selectedCategories
    };



    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    isSelectedKeyExist=(subKey)=>{
        let selectedCategories = this.state.selectedCategories;
        const categoryId = this.state.currentCategoryId; //check the currentCategory exist
        if (selectedCategories.hasOwnProperty(categoryId)){
            if(selectedCategories[categoryId].indexOf(subKey)>-1){
                return true
            }
            return false
        }
        return false
    }

    _toggleCheckbox = (subKey) =>{
        const categoryId = this.state.currentCategoryId; //check the currentCategory exist
        let selectedCategories = this.state.selectedCategories;
        console.log(selectedCategories);
        if(this.isSelectedKeyExist(subKey)){
            const index = selectedCategories[categoryId].indexOf(subKey);
            selectedCategories[categoryId].splice(index,1);
        }
        else{
            if(selectedCategories.hasOwnProperty(categoryId)){
                selectedCategories[categoryId].push(subKey)
            }
            else{
                selectedCategories[categoryId]=[subKey];
            }
        }
        this.props.setContext({selectedCategories:selectedCategories})
    };

    _handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y
        });
    };

    _handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    displaySubCategoriesCheckbox =()=> {
        let key = this.state.currentCategoryIndex; //now key = index of categories
        let subCategories = this.state.categories[key].subCategory;
        return subCategories.map((subCategory, index)=>(
            <ListItem key={index}>
                <CheckBox
                    checked={this.isSelectedKeyExist(subCategory.subCategoryId)}
                    onPress={()=>this._toggleCheckbox(subCategory.subCategoryId)}
                />
                <Body>
                <Text> {subCategory.subCategoryName}</Text>
                </Body>
            </ListItem>

        ));
    };

    displayModalContent = () =>{
        if (this.state.isModalVisible){
            return (
                <View style={styles.modalContent}>
                    {this.displaySubCategoriesCheckbox()}
                </View>
            );
        }
    };

    displayCategoriesButton= ()=>{
        let categories = this.state.categories;

        return categories.map((category, index)=>(
            <Button
                info
                large
                key={index}
                style={styles.categoryButton}
                onPress={()=>{
                    this.setState({
                        currentCategoryIndex : index,
                        currentCategoryId : category.categoryId
                    });
                    this._toggleModal();
                }}>
                <Text style={styles.categoryTitle}>
                    {category.categoryName}
                </Text>
            </Button>
        ));
    }

    render(){
        return (
            <Container>
                <View style={
                    styles.categoryContainer}>
                    {this.displayCategoriesButton()}
                </View>

                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this._toggleModal}
                    scrollTo={this._handleScrollTo}
                    scrollOffset={this.state.scrollOffset}
                    style={styles.bottomModal}
                >
                    <View style={styles.scrollableModal}>
                        <ScrollView
                            ref={ref => (this.scrollViewRef = ref)}
                            onScroll={this._handleOnScroll}
                            scrollEventThrottle={16}
                        >
                            <View>
                                {this.displayModalContent()}
                            </View>
                        </ScrollView>
                    </View>

                </Modal>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 22,

    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    scrollableModal: {
        maxHeight: '60%',
        backgroundColor: "white",
    },

    categoryContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },

    categoryButton: {
        width:'45%',
        padding:5,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
    },

    categoryTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding:5,
    },
    centerButton:{
        alignSelf:'center',
        padding:20,
        margin:5
    },
    title:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf:'center',
    },

});

export default compose(withContext) (CategoriesSelection)
