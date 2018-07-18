import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, ScrollView} from "react-native";
import {Spinner, Button, Text, Icon, Fab} from 'native-base';
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import ProjectSection from '../components/ProjectSection';
import DatabaseService from '../api/databaseService';
import TagsSection from '../components/TagsSection';
import {Authentication} from '../api'

class ViewProfile extends React.Component {

    static propTypes = {
        imgUrl: PropTypes.string,
        fullName: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        experiences: PropTypes.array,
        skillSets: PropTypes.array,
        projects: PropTypes.array,
        tags: PropTypes.array,
    }

    state = {
        ready: false,
        imgUrl: "",
        fullName: "",
        description: "",
        status: "",
        experiences: [],
        skillSets: [],
        projects: [],
        tags: [],
        scrollView: null,
        isTimeline: true
    };

    static navigationOptions = ({navigation}) => ({
        title: 'View',
        headerTitleStyle: {flex: 1, textAlign: 'center'},
        headerRight: <View></View>,
        tabBarOnPress: () => {
            if(navigation.isFocused()){
                navigation.state.params.scrollToTop()
            }
            else {
                navigation.navigate('View', { uid: Authentication.currentUser().uid});
            }
        }
    });

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
        let uid = ""
        let paramUid = this.props.navigation.getParam('uid')
        if (paramUid !== null || paramUid !== "" || typeof(paramUid) !== "undefined") {
            uid = paramUid
        } else {
            uid = this.props.uid
        }
        db.getEmployeeInfo(uid).then((result) => {
            console.log(result)
            this.getAllTags(result.tagIds)
            this.setState({
                imgUrl: result.imgUrl,
                fullName: result.firstName + ' ' + result.lastName,
                description: result.description,
                status: result.status,
                experiences: result.experiences,
                projects: result.projects,
                skillSets: result.skillSet,
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

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState()
        }
    );

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

    switchView = () => {
        this.setState({
            isTimeline: !this.state.isTimeline
        })
    }


    render() {
        const {
            imgUrl,
            fullName,
            status,
            description,
            experiences,
            skillSets,
            projects,
            tags,
            ready,
            isTimeline
        } = this.state;
        return (
            <View>
                {
                    ready ? (
                        <View>
                            <ScrollView
                                contentContainerStyle={styles.ScrollContainer}
                                ref={scrollView => this.scrollView = scrollView}
                            >
                                <View style={styles.MainContainer}>
                                    <SwitchButton onPress={() => this.switchView()}/>
                                    <CircularProfilePhoto url={imgUrl} diameter={150}/>
                                    <Text style={styles.ProfileName}>
                                        {fullName}
                                    </Text>
                                    <StatusText status={status}/>
                                    <Text style={styles.Description}>
                                        {description}
                                    </Text>
                                    <TagsSection tags={tags}/>
                                    <ExperiencesCard experiences={experiences}/>
                                    <SkillSetsCard skills={skillSets}/>
                                    { isTimeline ? (
                                            <Text>Timeline</Text>
                                        ) : (
                                            <ProjectSection projects={projects} navigation={this.props.navigation}/>
                                        )
                                    }
                                </View>
                            </ScrollView>
                            <FavButton/>
                        </View>
                    ) : (
                        <DataLoading/>
                    )
                }
            </View>
        )
    }
}

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

const SwitchButton = ({onPress}) => (
    <Button
        style={styles.SwitchButton}
        onPress={onPress}
    >
        <Text uppercase={false}>Switch View</Text>
    </Button>
);

const FavButton = () => (
    <Fab>
        <Icon type={"Ionicons"} name={"md-star-outline"}/>
    </Fab>
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

    ProfileName: {
        marginTop: 20,
        fontSize: 26,
    },

    Description: {
        marginTop: 20,
        maxWidth: '90%',
        textAlign: 'center'
    },

    SwitchButton: {
        alignSelf: 'flex-end',
        marginRight: "4%"
    }
});

export default compose()(ViewProfile)
