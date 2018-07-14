import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button, Container} from "native-base";
import Modal from "react-native-modal";
import {withContext} from "../context/withContext";
import DatabaseService from "../api/databaseService";


class CategoriesSelection extends React.Component {

    static propTypes = {
        selectedCategories : PropTypes.object,
        categories:PropTypes.array,
    };

    state = {
        currentCategoryIndex : null,
        currentCategoryId :'',
        categories: [],
        selectedCategories:{}
    };

    componentWillMount(){
        DatabaseService.getAllCategories().then(result=>{
            this.setState({categories: result})
        })
    }

    componentDidMount(){
        let {selectedCategories}=this.props;
        this.setState({
            selectedCategories: selectedCategories,
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
        const {selectedCategories, currentCategoryId}= this.state;
        if (selectedCategories.hasOwnProperty(currentCategoryId)){
            if(selectedCategories[currentCategoryId].indexOf(subKey)>-1){
                return true
            }
        }
        return false
    }

    _toggleCheckbox = (subKey) =>{
        let {selectedCategories,currentCategoryId} = this.state;
        if(this.isSelectedKeyExist(subKey)){
            const index = selectedCategories[currentCategoryId].indexOf(subKey);
            selectedCategories[currentCategoryId].splice(index,1);
        }
        else{
            if(selectedCategories.hasOwnProperty(currentCategoryId)){
                selectedCategories[currentCategoryId].push(subKey)
            }
            else{
                selectedCategories[currentCategoryId]=[subKey];
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
    //
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
        const {categories, currentCategoryIndex} =this.state
        return (
            <Container>
                <View style={
                    styles.categoryContainer}>
                    {this.renderCategoriesButton(categories)}

                </View>

                <Modal
                    isVisible={currentCategoryIndex !== null}
                    onBackdropPress={()=>this.closeModal()}
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
                            <View style={styles.modalContent}>
                                {this.renderSubCategoriesCheckbox(currentCategoryIndex)}

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
