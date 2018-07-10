import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button, Container} from "native-base";
import Modal from "react-native-modal";
import Stepper from "../../components/Stepper";

class EmployerCategorySelect extends React.Component {

    static propTypes = {

    };

    state = {
        modalPageKey :'',
        isModalVisible:false,

        categoryDataMockUp : {
            cateKey1 : {
                categoryName: "cate1",
                subCategories: {
                    subKey1: {
                        subCategoryName: "subCate1",
                        checked: false
                    },
                    subKey2: {
                        subCategoryName: "subCate2",
                        checked: false
                    },
                    subKey3: {
                        subCategoryName: "subCate3",
                        checked: false
                    },
                }
            },cateKey2 : {
                categoryName: "cate2",
                subCategories: {
                    subKey1: {
                        subCategoryName: "subCate1",
                        checked: false
                    },
                    subKey2: {
                        subCategoryName: "subCate2",
                        checked: false
                    },
                    subKey3: {
                        subCategoryName: "subCate3",
                        checked: false
                    },
                }
            }
        }

    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    _toggleCheckbox2 = (categoryKey, subKey) =>{
        let cloneData = this.state.categoryDataMockUp;
        cloneData[categoryKey].subCategories[subKey].checked = !cloneData[categoryKey].subCategories[subKey].checked
        this.setState({categoryDataMockUp:cloneData})
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
        let key = this.state.modalPageKey;
        let subData = this.state.categoryDataMockUp[key].subCategories;
        // return Object;
        return Object.keys(subData).map((subKey, index)=>(
            <ListItem key={index}>
                <CheckBox
                    checked={subData[subKey].checked}
                    onPress={()=>{this._toggleCheckbox2(key,subKey)}}
                />
                <Body>
                <Text>{subData[subKey].subCategoryName}</Text>
                </Body>
            </ListItem>

        ));
    };


    displayModalContent = () =>{
        let key = this.state.modalPageKey;
        if (key && this.state.isModalVisible){
            return (
                <View style={styles.modalContent}>
                    {this.displaySubCategoriesCheckbox()}
                </View>
            );
        }
        return (
            <View><Text>Error!</Text></View>
        );
    };

    displayCategoriesButton= ()=>{
        let categoriesData = this.state.categoryDataMockUp;
        return Object.keys(categoriesData).map((key, index)=>(
            <Button
                info
                large
                key={index}
                style={styles.categoryButton}
                onPress={()=>{
                    this.setState({
                        modalPageKey : key
                    });
                    this._toggleModal();}}>
                <Text style={styles.categoryTitle}>
                    {categoriesData[key].categoryName}
                </Text>
            </Button>
        ));
    }

    render(){
        return (
            <Container style={{flex:1}} >
                <Text
                    style={styles.title}>
                    Employer Sign Up
                </Text>
                <Stepper
                    currentPosition={1}
                    stepCount={2}
                />
                <View style={
                   styles.categoryContainer}>
                    {this.displayCategoriesButton()}
                </View>
                <Button
                    info
                    style={styles.centerButton}
                    onPress={() => {}} //function for sign up
                >
                    <Text
                        style={styles.categoryTitle}>
                        Submit
                    </Text>
                </Button>

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
        height: '60%',
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
        width:'40%',
        padding:5,
        margin:5,
        justifyContent:'center',
    },

    categoryTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
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

export default compose() (EmployerCategorySelect)
