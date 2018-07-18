import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView, Text} from "react-native";
import CategoryCard from "../components/CategoryCard";
import DatabaseService from "../api/databaseService";
import CircularProfilePhoto from "../components/CircularProfilePhoto";
import {Authentication} from '../api'
import EditButton from "../components/EditButton";
import Modal from "react-native-modal";
import CategoriesSelection from "../components/CategoriesSelection";
import TextInputWithLabel from "../components/TextInputWithLabel";
import SaveButton from "../components/SaveButton";
import {Spinner, Toast} from "native-base";
import {hoistStatics} from "recompose";
import withContext from "../context/withContext";


const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);


class EditEmployerProfile extends React.Component {


    static navigationOptions = () => ({
        title: 'Edit Profile'
    });

    //Copy from ViewEmployer Profile
    static propTypes = {
        imgUrl: PropTypes.string,
        fullName: PropTypes.string,
        companyName: PropTypes.string,
        categories: PropTypes.array,
    }

    state = {
        imgUrl: "",
        fullName: "",
        companyName:"",
        categories:[],
        ready:false,
        modalReady:true,
        scrollView: null,
        selectedCategories:{},

        //for edit in Modal
        editedFirstName:'',
        editedLastName:'',
        editedCompanyName:'',
        editedImgUrl:'',
        editedSelectedCategories:'',

        //check Error
        error: {
            flags: {
                editedFirstName: false,
                editedLastName: false,
                editedCompanyName: false,
            },
            message: {
                editedFirstName: "Required",
                editedLastName: "Required",
                editedCompanyName:"Required",
            }
        },
        modalVisible:0,
    };


    componentDidMount() {
        this.props.navigation.setParams({
            fetchData: this.fetchData.bind(this),
            scrollToTop: this.scrollToTop.bind(this)
        })
    }

    scrollToTop() {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    }

    fetchData() {
        console.log("fetching data..")
        let db = new DatabaseService
        // let uid = this.props.navigation.getParam('uid') //need Pan to add param when edit to here
        let uid = Authentication.currentUser().uid;

        db.getEmployerInfo(uid).then((result) => {
            console.log(result)
            this.setState({
                imgUrl: result.imgUrl,
                fullName: result.firstName + ' ' + result.lastName,
                companyName:result.companyName,
                categories:result.categories,
                ready: true
            })
        }).catch((error) => {
            console.log(error)
        })

    }

    resetState() {
        this.setState({
            ready: false,
            imgUrl: "",
            fullName: "",
            companyName:"",
            categories:[],
            // originalSelectedCategories:{}
        })
    }

    initializeState() {
        this.resetState()
        this.fetchData()
    }

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState()
        }
    );

    handleChange = (name) => (event) => {
        this.setState({[name]:event.nativeEvent.text});
    };

    closeModal = () =>{
        const {editedSelectedCategories} = this.state
        // console.log(originalSelectedCategories)
        console.log(editedSelectedCategories)
        this.setState({
            modalVisible :0,
            editedFirstName:'',
            editedLastName:'',
            editedImgUrl:'',
        })
    }

    openModal = (keyId) =>{
        this.setState({
            modalVisible : keyId
        })
    }

    editFullName = async() =>{
        const uid = Authentication.currentUser().uid
        const {editedFirstName,editedLastName}= this.state
        const db= new DatabaseService;

        let error =0;
        if(editedFirstName ===''){
            this.validate("editedFirstName")
        }

        if(editedLastName ===''){
            this.validate("editedLastName")
        }

        if (error>0){
            this.setState({modalReady:true})
            return;
        }

        await db.updateEmployerFirstName(uid, editedFirstName);
        await db.updateEmployerLastName(uid, editedLastName);

        this.setState({
            fullName : editedFirstName+ " " +editedLastName,
        })

        this.closeModal()
    }

    editCompanyName = async() =>{
        const uid = Authentication.currentUser().uid;
        const {editedCompanyName} = this.state;
        const db = new DatabaseService

        if(editedCompanyName===''){
            this.validate("editCompanyName")
            this.setState({modalReady:true})
            return;
        }

        await db.updateEmployerCompanyName(uid, editedCompanyName)

        this.setState({
            companyName : editedCompanyName,
        })
        this.closeModal()
    }


    setError = (errorField, message) => {
        const {error} = this.state;
        if (message !== null) {
            error.flags[errorField] = true;
            error.message[errorField] = message;
            this.setState({error})
        }
        else {
            error.flags[errorField] = false;
            this.setState({error})
        }
    };

    validate = (errorField) => {
        const field = this.state[errorField];
        if (field === '') {
            this.setError(errorField, "Required")
        }
        else {
            this.setError(errorField, null)
        }
    };

    updateCategories = (categories) =>{
        this.setState({
            categories : categories
        })
    }

    render(){
        const {imgUrl, fullName,editedFirstName,editedLastName, editedCompanyName, companyName, categories, modalVisible, ready, modalReady} = this.state;
        const {message, flags} = this.state.error;
        const uid = Authentication.currentUser().uid;
        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <CircularProfilePhoto url={imgUrl} diameter={150}/>

                            <Text style={styles.ProfileName}>
                                {fullName}
                            </Text>
                            <EditButton onPress={()=>this.openModal(1)}/>

                            <Modal
                                style={styles.ModalContainer}
                                isVisible={modalVisible===1}
                                onBackdropPress={()=>this.closeModal()}>
                                {modalReady ? (
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: 'white'
                                    }}>
                                        <TextInputWithLabel
                                            label="First name"
                                            placeholder="First name"
                                            value={editedFirstName}
                                            hasError={flags.editedFirstName}
                                            onBlur={() => this.validate("editedFirstName")}
                                            onChange={this.handleChange("editedFirstName")}
                                            errorMessage={message.editedFirstName}
                                        />
                                        <TextInputWithLabel
                                            label="Last name"
                                            placeholder="Last name"
                                            value={editedLastName}
                                            hasError={flags.editedLastName}
                                            onBlur={() => this.validate("editedLastName")}
                                            onChange={this.handleChange("editedLastName")}
                                            errorMessage={message.editedLastName}
                                        />
                                        <SaveButton onPress={() => this.editFullName()}/>
                                    </View>
                                    ) : (
                                        <DataLoading/>
                                    )
                                }

                            </Modal>

                            <Text style={styles.Description}>
                                Work at {companyName}
                            </Text>
                            <EditButton onPress={()=>this.openModal(2)}/>

                            <Modal
                                style={styles.ModalContainer}
                                isVisible={modalVisible ===2}
                                onBackdropPress={()=>this.closeModal()} >
                                <View style={{ flex: 1 }}>
                                    <TextInputWithLabel
                                        label="Company Name"
                                        placeholder="Company Name"
                                        value={editedCompanyName}
                                        hasError={flags.editedCompanyName}
                                        onBlur={() => this.validate("editedCompanyName")}
                                        onChange={this.handleChange("editedCompanyName")}
                                        errorMessage={message.editedCompanyName}
                                    />
                                    <SaveButton onPress={()=>this.editCompanyName()}/>
                                </View>
                            </Modal>

                            <CategoryCard
                                categories={categories}
                                editable={true}
                                uid={uid}
                                updateCategories={this.updateCategories}
                            />

                        </View>
                    ) : (
                        <DataLoading/>
                    )
                }
            </ScrollView>
          )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    ProfileName: {
        marginTop: 20,
        fontSize: 26,
    },

    Description: {
        marginTop: 20,
        maxWidth: '90%',
        textAlign: 'center'
    },

    ModalContainer:{
        flex:1,
        backgroundColor:'white'
    }
});

export default compose()(EditEmployerProfile)

