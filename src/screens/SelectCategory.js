import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {Body, CheckBox, ListItem, Button} from "native-base";
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
            <Button success large
                key={index}
                style={styles.categoryButton}
                onPress={()=>{
                    this.setState({
                        modalPageKey : key
                    });
                    this._toggleModal();}}>
                <Text style={styles.categoryTitle}>
                    {key}
                </Text>
            </Button>
        ));
    }


    render(){
        return (
            <View style={{flex:1}}>
                <View style={
                   styles.categoryContainer}>
                    {this.displayCategoriesButton()}
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this._toggleModal}
                    scrollTo={this._handleScrollTo}
                    scrollOffset={this.state.scrollOffset}
                    // scrollOffsetMax={400 - 300} // content height - ScrollView height
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
    }
});

export default compose() (SelectCategory)
