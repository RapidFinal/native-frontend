import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, Modal} from "react-native";
import {Spinner} from 'native-base';
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import ProjectSection from '../components/ProjectSection';
import DatabaseService from '../api/databaseService';
import TagsSection from '../components/TagsSection';
import {Authentication} from '../api'
import EditableName from '../components/EditableName'

class EditProfile extends React.Component {

    static propTypes = {

    }

    state = {
        ready: false,
        imgUrl: "",
        firstName: "Josep",
        lastName: "Bort",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "Looking for job",
        experiences: [
            {
                title: "Web",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
        ],
        skillSets: ["Python", "Java"],
        projects: [
            {
                name: "Notey",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                date: "15/06/2018"
            }
        ],
        tags: ["Python", "Java"],
        scrollView: null,
        descriptionModal: false,
        tagModal: false,
    }

    updateName(firstName, lastName) {
        this.setState({
            firstName: firstName,
            lastName: lastName
        })
    }

    updateExperienceState(newExp) {
        this.setState({
            experiences: newExp
        })
    }

    updateSkillSetsState(newSkills) {
        this.setState({
            skillSets: newSkills
        })
    }

    toggleModal(name, value) {
        alert('toggle')
        this.setState({
            [name]: value
        })
    }

    getAllTags(tagIds) {
        let db = new DatabaseService
        tagIds.forEach((id) => {
            db.getTagName(id).then((tagName) => {
                this.setState(prevState => ({
                    tags: [...prevState.tags, tagName]
                }))
            }).catch((error) => {
                console.log(error)
            })
        })
    }

    fetchData() {
        let db = new DatabaseService
        let uid = Authentication.currentUser().uid
        db.getEmployeeInfo(uid).then((result) => {
            this.getAllTags(result.tagIds)
            this.setState({
                imgUrl: result.imgUrl,
                firstName: result.firstName,
                lastName: result.lastName,
                description: result.description,
                status: result.status,
                experiences: result.experiences,
                projects: result.projects,
                skillSets: result.skillSet,
                ready: true
            })
        }).catch((error) => {
            alert(error)
        })
    }

    resetState() {
        this.setState({
            ready: false,
            imgUrl: "",
            firstName: "",
            lastName: "",
            description: "",
            status: "",
            experiences: [],
            skillSets: [],
            projects: [],
            tags: [],
        })
    }

    initializeState() {
        this.resetState()
        this.fetchData()
    }

    didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState()
        }
    );

    render(){
        const {ready, imgUrl, firstName, lastName, description, status, experiences, skillSets, projects, tags, fullNameModal} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <CircularProfilePhoto url={imgUrl} diameter={150}/>
                            <EditableName firstName={firstName} lastName={lastName} updateName={this.updateName.bind(this)}/>
                            <StatusText status={status}/>
                            <EditableDescription description={description}/>
                            <EditableTags tags={tags}/>
                            <ExperiencesCard experiences={experiences}/>
                            <SkillSetsCard skills={skillSets}/>
                            <ProjectSection projects={projects} navigation={this.props.navigation}/>
                        </View>
                    ) : (
                        <DataLoading/>
                    )
                }
            </ScrollView>
        )
    }
}

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

// const EditNameModal = ({fullNameModal, toggleModal}) => (
//     <Modal
//         animationType="slide"
//         transparent={false}
//         visible={fullNameModal}
//         onRequestClose={() => {
//             alert('Modal has been closed.');
//         }}>
//         <View style={{marginTop: 22}}>
//             <View>
//                 <Text>Hello World!</Text>
//                 <TouchableHighlight
//                     onPress={() => {
//                         toggleModal('fullNameModal', false)
//                     }}>
//                     <Text>Hide Modal</Text>
//                 </TouchableHighlight>
//             </View>
//         </View>
//     </Modal>
// );

const EditableDescription = ({description}) => (
    <View style={[styles.DescriptionSection, styles.CenterAlign]}>
        <Text style={styles.DescriptionText}>
            {description}
        </Text>
        <Image
            source={require('../assets/images/edit.png')}
            style={[styles.EditIcon, styles.DescriptionEditIcon]}
        />
    </View>
);

const EditableTags = ({tags}) => (
    <View style={[styles.CenterAlign]}>
        <TagsSection tags={tags}/>
        <Image
            source={require('../assets/images/edit.png')}
            style={[styles.EditIcon, styles.TagsEditIcon]}
        />
    </View>
);

const styles = StyleSheet.create({
    ScrollContainer: {
        paddingVertical: 20,
    },

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    DescriptionSection: {
        marginTop: 20,
        maxWidth: '90%',
    },

    DescriptionText: {
        textAlign: 'center'
    },

    DescriptionEditIcon: {
        marginTop: 15,
    },

    CenterAlign: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    Uploader: {
        position: 'absolute',
        left: 50,
        top: 120,
        zIndex: -1,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#989898',
        shadowOffset: { width: 5, height: 5},
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    EditIcon: {
        width: 20,
        height: 20,
    },

    TagsEditIcon: {
        marginTop: 15,
    }

});

export default compose() (EditProfile)
