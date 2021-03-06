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
import {withContext} from "../context/withContext";
import hoistStatics from "recompose/hoistStatics";
import CategoryCard from "../components/CategoryCard";
import TimelineProjectCard from "../components/TimelineProjectCard";

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
    };

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
        isTimeline: true,
        canLike: false,
        liked: false,
        major: "",
        categories: [],
        isEmployeeProfile: false
    };

    static navigationOptions = ({navigation}) => ({
        title: 'View',
        headerTitleStyle: {flex: 1, textAlign: 'center'},
        headerRight: <View></View>,
        tabBarOnPress: () => {
            if(navigation.isFocused()){
                navigation.state.params.scrollToTop();
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
        this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }

    fetchData() {
        //console.log("fetching data..")
        let db = new DatabaseService
        let uid = "";
        let paramUid = this.props.navigation.getParam('uid')
        if (paramUid !== null || paramUid !== "" || typeof(paramUid) !== "undefined") {
            uid = paramUid;
        } else {
            uid = this.props.uid;
        }
        //console.log("uid : " + uid)
        db.getEmployeeInfo(uid).then((result) => {
            //console.log(result);
            this.getAllTags(result.tagIds);
            this.setState({
                imgUrl: result.imgUrl,
                fullName: result.firstName + ' ' + result.lastName,
                description: result.description,
                status: result.status,
                experiences: result.experiences,
                projects: result.projects,
                skillSets: result.skillSet,
                major: result.major,
                categories: result.categories,
                ready: true
            });

        }).catch((error) => {
            console.error(error);
        });
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
            scrollView: null,
            isTimeline: true,
            canLike: false,
            liked: false,
            major: "",
            categories: [],
            isEmployeeProfile: false
        });
    }

    initializeState() {
        this.resetState();
        this.fetchData();
        this.updateRecentView();
        this.setCanLike();
        this.setLiked();
        this.setIsEmployeeProfile();
    }

    didBlurSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
            this.initializeState();
        }
    );

    getAllTags(tagIds) {
        let db = new DatabaseService;
        tagIds.forEach((id) => {
            db.getTagName(id).then((tagName) => {
                this.setState(prevState => ({
                    tags: [...prevState.tags, tagName]
                }));
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    switchView = () => {
        this.setState({
            isTimeline: !this.state.isTimeline
        })
    }

    setCanLike = () => {
        const {role} = this.props.context;
        const db = new DatabaseService;

        let paramUid = this.props.navigation.getParam('uid');

        if (role) {
            db.getUserRole(paramUid).then(viewRole => {
                this.setState({
                    canLike: role === "employer" && viewRole === "employee"
                })
            })
        }
    }

    setLiked = () => {
        const db = new DatabaseService;
        const {currentUser} = this.props.context;
        const paramUid = this.props.navigation.getParam('uid');

        if (currentUser) {
            db.getLikedEmployee(currentUser.uid)
                .then(result => {
                    if (result[paramUid]) {
                        this.setState({
                            liked: true,
                        })
                    }
                })
        }
    }

    toggleLikeProfile = async () => {
        const {liked} = this.state;
        const paramUid = this.props.navigation.getParam('uid');
        const {currentUser} = this.props.context;
        const db = new DatabaseService;
        if (liked) {
            let result = await db.unLikedEmployee(currentUser.uid, paramUid);
            this.setState({
                liked: false,
            });
        }
        else {
            let result = await db.likedEmployee(currentUser.uid, paramUid);
            this.setState({
                liked: true,
            });
        }
    };

    updateRecentView = () => {
        const db = new DatabaseService;
        const {currentUser} = this.props.context;
        const paramUid = this.props.navigation.getParam('uid');

        if (currentUser && currentUser.uid !== paramUid) {
            db.getUserRole(paramUid)
                .then(role => {
                    if (role === "employee") {
                        db.updateEmployeeRecentView(currentUser.uid, paramUid)
                    }
                    else {
                        db.updateEmployerRecentView(currentUser.uid, paramUid)
                    }
                })
        }
    }

    setIsEmployeeProfile = () => {
        const db = new DatabaseService;
        const paramUid = this.props.navigation.getParam('uid');

        db.getUserRole(paramUid)
            .then(role => {
                this.setState({
                    isEmployeeProfile: role === "employee"
                })
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
            isTimeline,
            canLike,
            major,
            categories,
            isEmployeeProfile,
            liked
        } = this.state;
        const uid = this.props.navigation.getParam('uid');

        return (
            <View style={styles.Flex}>
                {
                    ready ? (
                        <View>
                            <ScrollView
                                contentContainerStyle={styles.ScrollContainer}
                                ref={scrollView => this.scrollView = scrollView}
                            >
                                <View style={styles.MainContainer}>
                                    <SwitchButton
                                        onPress={() => this.switchView()}
                                        isTimeline={isTimeline}
                                    />
                                    <CircularProfilePhoto url={imgUrl} diameter={150}/>
                                    <Text style={styles.ProfileName}>
                                        {fullName}
                                    </Text>
                                    <StatusText status={status}/>
                                    <Text style={styles.Text}>{major}</Text>
                                    <Text style={styles.Description}>
                                        {description}
                                    </Text>
                                    <TagsSection tags={tags}/>
                                    <ExperiencesCard experiences={experiences}/>
                                    <SkillSetsCard
                                        editable={false}
                                        skills={skillSets}
                                        onOpenModal={null}
                                        onCloseModal={null}
                                        setSkillInput={null}
                                        onCurrentEditSkill={null}
                                    />
                                    {
                                        !isEmployeeProfile ? (
                                            <CategoryCard
                                                categories={categories}
                                                editable={false}
                                                uid={uid}
                                                userRole="employee"
                                            />
                                        ) : (null)
                                    }
                                </View>
                                { isTimeline ? (
                                        <TimelineProjectCard projects={projects}/>
                                    ) : (
                                        <View style={styles.MainContainer}>
                                            <ProjectSection projects={projects} navigation={this.props.navigation}/>
                                        </View>
                                    )
                                }
                            </ScrollView>
                            { canLike ?
                                (<FavButton
                                    onPress={this.toggleLikeProfile}
                                    liked={liked}
                                />)
                                    :
                                (null)
                            }
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

const SwitchButton = ({onPress, isTimeline}) => (
    <Button
        style={[styles.SwitchButton, isTimeline ? styles.SwitchButtonTimeline : styles.SwitchButtonNormal]}
        onPress={onPress}
    >
        <Text
            uppercase={false}
            style={[!isTimeline ? styles.ButtonText : undefined]}
        >
            Switch View
        </Text>
    </Button>
);

const FavButton = ({onPress, liked}) => (
    <Fab
        style={styles.Fab}
        onPress={onPress}
    >
        <Icon
            type={"Ionicons"}
            name={liked ? "ios-heart" : "ios-heart-outline"}
            style={styles.Icon}
        />
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
    },

    SwitchButtonTimeline: {
        backgroundColor: "#15BBCF",
    },

    SwitchButtonNormal: {
        backgroundColor: "white",
        borderColor: "#15BBCF",
        borderWidth: 1,
    },

    ButtonText: {
        color: "#15BBCF"
    },

    Flex: {
        flex: 1
    },

    Icon: {
        color: '#15BBCF',
        fontSize: 25
    },

    Fab: {
        backgroundColor: "white",
        borderColor: "#15BBCF",
        borderWidth: 1,
        borderRadius: 35,
    },

    Text: {
        marginTop: "2%",
    }
});

export default hoistStatics(compose(withContext)) (ViewProfile)
