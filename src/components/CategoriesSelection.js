import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView, Text} from "react-native";
import {Body, CheckBox, ListItem, Button, Spinner} from "native-base";
import Modal from "react-native-modal";
import {withContext} from "../context/withContext";
import DatabaseService from "../api/databaseService";


const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

class CategoriesSelection extends React.Component {

    static propTypes = {
        setSelectedState : PropTypes.func,
    };

    state = {
        currentCategoryIndex : null,
        currentCategoryId :'',
        categories: [],
        ready:false,
    };

    componentDidMount(){
        this.getCategoriesData();
    }

    getCategoriesData = () => {
        DatabaseService.getAllCategories().then(result=>{
            this.setState({
                categories: result,
                ready: true
            })
        })
    }

    openModal=(index,categoryId)=>{
        this.setState({
            currentCategoryIndex: index,
            currentCategoryId : categoryId,
        })
    }

    closeModal=()=>{
        this.setState({
            currentCategoryIndex: null,
            currentCategoryId : '',
        })
    }


    isSelectedKeyExist=(subKey)=>{
        const {selectedCategories}=this.props;
        const {currentCategoryId}= this.state;
        if (selectedCategories.hasOwnProperty(currentCategoryId)){
            if(selectedCategories[currentCategoryId].indexOf(subKey)>-1){
                return true
            }
        }
        return false
    }

    _toggleCheckbox = (subKey) =>{
        let {selectedCategories}=this.props;
        const {currentCategoryId}= this.state;
        if (selectedCategories.hasOwnProperty(currentCategoryId)){
            const index = selectedCategories[currentCategoryId].indexOf(subKey);
            if(selectedCategories[currentCategoryId].indexOf(subKey)>-1){
                selectedCategories[currentCategoryId].splice(index,1);
                if (selectedCategories[currentCategoryId].length===0){
                    delete selectedCategories[currentCategoryId];
                }
            }
            else{selectedCategories[currentCategoryId].push(subKey);
            }
        }
        else{
            selectedCategories[currentCategoryId]=[subKey];
        }

        this.props.setSelectedState(selectedCategories);
    };

    renderSubCategoriesCheckbox =(index)=> {
        if(index!==null){
            let subCategories = this.state.categories[index].subCategory;
            return subCategories.map((subCategory, idx)=>(
                <ListItem key={idx}>
                    <CheckBox
                        checked={this.isSelectedKeyExist(subCategory.subCategoryId)}
                        onPress={()=>this._toggleCheckbox(subCategory.subCategoryId)}
                    />
                    <Body>
                    <Text> {subCategory.subCategoryName}</Text>
                    </Body>
                </ListItem>
            ))
        }
    };

    renderCategoriesButton= (categories)=>{
        return categories.map((category, index)=>(
            <Button
                info
                large
                key={index}
                style={styles.categoryButton}
                onPress={()=>{
                    this.openModal(index,category.categoryId)
                }}>
                <Text style={styles.categoryTitle}>
                    {category.categoryName}
                </Text>
            </Button>
        ));
    }


    render(){
        const {categories, currentCategoryIndex, ready} =this.state
        return (
            <View>
            { ready ? (
                    <View>

                        <ScrollView>
                            <View style={styles.categoryContainer}
                            >
                                {this.renderCategoriesButton(categories)}
                            </View>
                        </ScrollView>

                        <Modal
                            isVisible={currentCategoryIndex !== null}
                            onBackdropPress={()=>this.closeModal()}
                            style={styles.bottomModal}
                        >
                            <View style={styles.scrollableModal}>
                                <ScrollView>
                                    <View style={styles.modalContent}>
                                        {this.renderSubCategoriesCheckbox(currentCategoryIndex)}
                                    </View>
                                </ScrollView>
                            </View>

                        </Modal>
                    </View>
                ) : (<DataLoading/>)}
            </View>
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
        flexWrap: 'wrap',
        marginHorizontal: '5%',
    },

    categoryButton: {
        width:'42%',
        padding: '1%',
        margin: '3%',
    },

    categoryTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding:5,

    },
});

export default compose(withContext) (CategoriesSelection)
