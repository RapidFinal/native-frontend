import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView, Image} from "react-native";
import {Spinner} from 'native-base';
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import DatabaseService from '../api/databaseService';
import {Authentication} from '../api'
import EditableName from '../components/EditableName'
import EditableDescription from '../components/EditableDescription';
import EditableProjectSection from '../components/EditableProjectSection';
import EditableTags from '../components/EditableTags';
import EditableStatus from '../components/EditableStatus';
import CategoryCard from "../components/CategoryCard";
import EditableMajor from '../components/EditableMajor';

class EditProfile extends React.Component {

    static propTypes = {}

    state = {
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
        scrollView: null,
        descriptionModal: false,
        tagModal: false,
        selectedCategories: {},
        categories: [],
        major: "asdf",
    }

    updateName(firstName, lastName) {
        this.setState({
            firstName: firstName,
            lastName: lastName
        })
    }

    update(field, value) {
        this.setState({
            [field]: value
        })
    }

    updateProjects() {

    }

    deleteProject(index) {
        this.deleteProjectFromDB(this.state.projects[index].id)
        this.deleteProjectFromState(index)
    }

    deleteProjectFromDB(projectId) {
        let db = DatabaseService()
        let uid = Authentication.currentUser().uid
        db.deleteEmployeeProject(uid, projectId)
    }

    deleteProjectFromState(index) {
        console.log('delete from state')
        console.log(index)
        let projectsClone = this.state.projects
        if (index > -1) {
            projectsClone.splice(index, 1)
            this.setState({
                projects: projectsClone
            });
        }
    }

    addProject() {

    }

    addProjectToState() {

    }

    addProjectToDB() {

    }

    updateTags(tags) {
        this.setState({
            tags: tags
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

    updateCategories = (categories) => {
        this.setState({
            categories: categories
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
            console.log(result)
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
                major: result.major,
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
            major: "",
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

    render() {
        const {ready, imgUrl, firstName, lastName, description, status, experiences, skillSets, projects, major, tags, categories} = this.state;
        const uid = Authentication.currentUser().uid;
        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <CircularProfilePhoto url={imgUrl} diameter={150}/>
                            <EditableName firstName={firstName}
                                          lastName={lastName}
                                          updateName={this.updateName.bind(this)}
                                          userRole="employee"
                            />
                            <EditableStatus status={status} update={this.update.bind(this)}/>
                            <EditableMajor major={major} update={this.update.bind(this)}/>
                            <EditableDescription description={description} update={this.update.bind(this)}/>
                            <EditableTags tags={tags} updateTags={this.updateTags.bind(this)}/>
                            <ExperiencesCard experiences={experiences}/>
                            <SkillSetsCard skills={skillSets}/>
                            <CategoryCard
                                categories={categories}
                                editable={true}
                                uid={uid}
                                updateCategories={this.updateCategories}
                            />
                            <EditableProjectSection projects={projects} deleteProject={this.deleteProject.bind(this)}/>
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
        <Spinner color={"black"}/>
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
        shadowOffset: {width: 5, height: 5},
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

export default compose()(EditProfile)
