import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView} from "react-native";
import CategoryCard from "../components/CategoryCard";
import DatabaseService from "../api/databaseService";
import CircularProfilePhoto from "../components/CircularProfilePhoto";
import {Authentication} from '../api'
import {Spinner} from "native-base";
import EditableCompanyName from "../components/EditableCompanyName";
import EditableName from "../components/EditableName";
import ImageUploadButton from "../components/ImageUploadButton";


const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);


class EditEmployerProfile extends React.Component {


    static navigationOptions = () => ({
        title: 'Edit Profile'
    });

    static propTypes = {}

    state = {
        imgUrl: "",
        firstName:"",
        lastName:"",
        companyName:"",
        categories:[],
        ready:false,
        scrollView: null,
        selectedCategories:{},
    };


    componentDidMount() {
        this.props.navigation.setParams({
            fetchData: this.fetchData.bind(this),
        })
    }

    fetchData() {
        console.log("fetching data..")
        let db = new DatabaseService
        let uid = Authentication.currentUser().uid;

        db.getEmployerInfo(uid).then((result) => {
            console.log(result)
            this.setState({
                imgUrl: result.imgUrl,
                firstName: result.firstName,
                lastName: result.lastName,
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
            selectedCategories:{},
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

    updateCompanyName = (companyName) =>{
        this.setState({
            companyName : companyName
        })
    }

    updateName(firstName, lastName) {
        this.setState({
            firstName: firstName,
            lastName: lastName
        })
    }

    update(field, value){
        this.setState({
            [field] : value
        })
        let db = new DatabaseService
        const uid = Authentication.currentUser().uid
        db.updateEmployerImgUrl(uid,value)
    }

    render(){
        const {imgUrl, firstName,lastName, companyName, categories, ready} = this.state;
        const uid = Authentication.currentUser().uid;
        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <CircularProfilePhoto url={imgUrl}
                                                  diameter={150} style={styles.under}/>
                            <ImageUploadButton update={this.update.bind(this)}
                                               style={styles.over}/>
                            <EditableName firstName={firstName} lastName={lastName}
                                          updateName={this.updateName.bind(this)}/>
                            <EditableCompanyName
                                companyName={companyName}
                                updateCompanyName={this.updateCompanyName}
                            />

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
    },

    under:{
        zIndex:-1,
    },

    over:{
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        top: 120,
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#989898',
        shadowOffset:{
            widget: 5,
            height: 5,
        },
        shadowOpacity:1,
        shadowRadius:5,

    }
});

export default compose()(EditEmployerProfile)

