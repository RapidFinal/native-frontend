import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView, Image, Platform} from "react-native";
import Modal from 'react-native-modal'
import {Input, Item, Spinner} from 'native-base';
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
import ClickButton from "../components/ClickButton";
import ImageUploadButton from "../components/ImageUploadButton";

const ModalPopup = ({visible, close, children }) => (
    <Modal
        isVisible={visible}
        onBackdropPress={close}
        style={styles.bottomModal}
        avoidKeyboard={Platform.OS === 'ios'}
    >
        <View style={styles.scrollableModal}>
            <View style={styles.modalContent}>
                {children}
            </View>
        </View>
    </Modal>
);

const TextInput = ({text, onChange, value, ...rest}) => (
    <View style={styles.textInput}>
        <Item regular>
            <Input placeholder={text} onChange={onChange} value={value} {...rest}/>
        </Item>
    </View>
);

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
        skillInput: "",
        currentEditSkillId: null,
        showSkillModal: false,
        ExperienceModal: false,
        experienceNameInput: "",
        experienceDescInput: "",
        currentExperienceId: null,
        saveStatus: "Save",
        onSaving: false,
        selectedCategories: {},
        categories: [],
        major: "",
    }

    componentDidMount(){

    }

    setIdOnEdit = (id) => {
        this.setState({
            currentEditSkillId: id
        })
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

    showExperienceModal = (name, desc, id = null) => {
        this.setState({
            experienceModal: true,
            experienceNameInput: name,
            experienceDescInput: desc,
            currentExperienceId: id,
        })
    }

    hideExperienceModal = () => {
        this.setState({
            experienceModal: false,
            experienceNameInput: "",
            experienceDescInput: "",
            currentExperienceId: null,
        })
    }

    toggleExperienceModal = () => {
        this.setState((prev) => ({showExperienceModal: !prev.showExperienceModal}))
    }

    updateExperienceNameInput = (e) => {
        this.setState({
            experienceNameInput: e.nativeEvent.text
        })
    }

    updateExperienceDescInput = (e) => {
        this.setState({
            experienceDescInput: e.nativeEvent.text
        })
    }

    setExperienceInput = (value) => {
        this.setState({
            experienceInput: value
        })
    }

    onSaveExperience = () => {
        const {currentExperienceId, experienceNameInput, experienceDescInput} = this.state;

        const db = new DatabaseService();
        const uid = Authentication.currentUser().uid;
        if (experienceNameInput !== "" && experienceDescInput !== "") {
            if (currentExperienceId)
                db.updateEmployeeExperience(uid, currentExperienceId, experienceNameInput, experienceDescInput);
            else
                DatabaseService.createEmployeeExperiences(uid, experienceNameInput, experienceDescInput);
        }
        this.hideExperienceModal();
    }

    updateSkillSetsState(newSkills) {
        this.setState({
            skillSets: newSkills
        })
    }

    showSkillModal = () => {
        this.setState({
            showSkillModal: true
        })
    }

    hideSkillModal = () => {
        this.setState({
            showSkillModal: false,
            skillInput: "",
            currentEditSkillId: null
        })
    }

    toggleSkillModal = () => {
        this.setState((prev) => ({showSkillModal: !prev.showSkillModal}))
    }

    updateSkillInput = (e) => {
        this.setState({
            skillInput: e.nativeEvent.text
        })
    }

    setSkillInput = (value) => {
        this.setState({
            skillInput: value
        })
    }

    onSaveSkill = () => {

        this.setState({
            saveStatus: "Saving...",
            onSaving: true
        }, () => {

            const saved = () => {
                this.setState(({
                    saveStatus: "Save",
                    onSaving: false
                }), () => {
                    this.hideSkillModal();
                    this.fetchData();
                })

            };
            const {currentEditSkillId, skillInput} = this.state
            const db = new DatabaseService();
            const uid = Authentication.currentUser().uid;
            if (currentEditSkillId === null){
                db.createEmployeeSkillSet(uid, skillInput, saved);
            } else {
                db.updateEmployeeSkillSet(uid, currentEditSkillId, skillInput, saved)
            }


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

    fetchData = () => {
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
                categories: result.categories,
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
            showSkillModal: false,
            skillInput: "",
            currentEditSkillId: null
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
        const {ready, imgUrl, firstName, lastName, description, status, experiences, skillSets, projects, tags, showSkillModal, skillInput, saveStatus, onSaving, major, categories, showExperienceModal, experienceModal, experienceNameInput, experienceDescInput} = this.state;
        const uid = Authentication.currentUser().uid;
        return (
            <View>
                <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                    {
                        ready ? (
                            <View style={styles.MainContainer}>
                                <CircularProfilePhoto url={imgUrl} diameter={150}/>
                                <ImageUploadButton update={this.update.bind(this)}/>
                                <EditableName firstName={firstName}
                                              lastName={lastName}
                                              updateName={this.updateName.bind(this)}
                                              userRole="employee"
                                />
                                <EditableStatus status={status} update={this.update.bind(this)}/>
                                <EditableMajor major={major} update={this.update.bind(this)}/>
                                <EditableDescription description={description} update={this.update.bind(this)}/>
                                <EditableTags tags={tags} updateTags={this.updateTags.bind(this)}/>
                                <ExperiencesCard experiences={experiences} isEditable={true} showModal={this.showExperienceModal} triggerRefresh={()=>{this.fetchData()}}/>
                                <SkillSetsCard editable={true} triggerRefresh={this.fetchData} onCurrentEditSkill={this.setIdOnEdit} skills={skillSets} onOpenModal={this.showSkillModal} onCloseModal={this.hideSkillModal} setSkillInput={this.setSkillInput}  />
                                <CategoryCard
                                    categories={categories}
                                    editable={true}
                                    uid={uid}
                                    updateCategories={this.updateCategories}
                                    userRole="employee"
                                />
                                <EditableProjectSection projects={projects} deleteProject={this.deleteProject.bind(this)}/>
                            </View>
                        ) : (
                            <DataLoading/>
                        )
                    }
                </ScrollView>
                <ModalPopup visible={showSkillModal} close={this.hideSkillModal}>
                    <TextInput text={"Skill"} onChange={this.updateSkillInput} value={skillInput} />
                    <ClickButton disabled={onSaving} onPress={this.onSaveSkill}>{saveStatus}</ClickButton>
                </ModalPopup>
                <ModalPopup visible={experienceModal} close={this.hideExperienceModal}>
                    <TextInput text={"Name"} onChange={this.updateExperienceNameInput} value={experienceNameInput} />
                    <TextInput text={"Description"} onChange={this.updateExperienceDescInput} value={experienceDescInput} />
                    <ClickButton disabled={onSaving} onPress={this.onSaveExperience}>{saveStatus}</ClickButton>
                </ModalPopup>
            </View>
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
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,

    },
    scrollableModal: {
        maxHeight: '60%',
        backgroundColor: "white",
    },

});

export default compose()(EditProfile)
