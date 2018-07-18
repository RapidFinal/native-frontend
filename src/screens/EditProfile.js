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
import ProjectSection from '../components/ProjectSection';
import DatabaseService from '../api/databaseService';
import TagsSection from '../components/TagsSection';
import {Authentication} from '../api'
import EditableName from '../components/EditableName'
import EditableDescription from '../components/EditableDescription';
import ClickButton from "../components/ClickButton";

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
        skillInput: "",
        currentEditSkillId: null,
        showSkillModal: false,
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
        const {currentEditSkillId, skillInput} = this.state
        const db = new DatabaseService();
        const uid = Authentication.currentUser().uid;
        if (currentEditSkillId === null){
            db.createEmployeeSkillSet(uid, skillInput);
        } else {
            db.updateEmployeeSkillSet(uid, currentEditSkillId, skillInput)
        }
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
        const {ready, imgUrl, firstName, lastName, description, status, experiences, skillSets, projects, tags, showSkillModal, skillInput} = this.state;
        return (
            <View>
                <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                    {
                        ready ? (
                            <View style={styles.MainContainer}>
                                <CircularProfilePhoto url={imgUrl} diameter={150}/>
                                <EditableName firstName={firstName} lastName={lastName}
                                              updateName={this.updateName.bind(this)}/>
                                <StatusText status={status}/>
                                <EditableDescription description={description} update={this.update.bind(this)}/>
                                <EditableTags tags={tags}/>
                                <ExperiencesCard experiences={experiences}/>
                                <SkillSetsCard editable={true} onCurrentEditSkill={this.setIdOnEdit} skills={skillSets} onOpenModal={this.showSkillModal} onCloseModal={this.hideSkillModal} setSkillInput={this.setSkillInput}  />
                                <ProjectSection projects={projects} navigation={this.props.navigation}/>
                            </View>
                        ) : (
                            <DataLoading/>
                        )
                    }
                </ScrollView>
                <ModalPopup visible={showSkillModal} close={this.hideSkillModal}>
                    <TextInput text={"Skill"} onChange={this.updateSkillInput} value={skillInput} />
                    <ClickButton onPress={this.onSaveSkill}>Save</ClickButton>
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
