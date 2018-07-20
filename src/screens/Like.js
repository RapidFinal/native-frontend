import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import LikeCard from "../components/LikeCard";
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import {Content, Spinner} from "native-base";

let willFocusSubscription;

class Like extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            profiles : [],
            loading: true,
        };
    }

    componentDidMount() {
        const db = new DatabaseService;
        const currentUser = Authentication.currentUser();

        //db.likedEmployee(currentUser.uid, "woHMJwCUIigvifkWduoRAzedYS93");
        //db.likedEmployee(currentUser.uid, "xsxm38N1FrbRKdUzYSmUZX9NlqN2");
        //db.likedEmployee(currentUser.uid, "amIBLV0xwWgP4xxrXjAGDEbvS492");

        willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.setState({loading: true});
                db.getLikedEmployee(currentUser.uid).then(async (likeProfiles) => {
                    /*** BEGIN infoTasks ***/
                        // Create infoTasks (promises) to get likeProfileInfo for all uid
                    const infoTasks = [];
                    for (let uid in likeProfiles) {
                        let infoTask = new Promise(async (resolve) => {
                            const likeProfileInfo = await db.getEmployeeInfo(uid); // Must get employeeInfo first, before you can get tagIds
                            likeProfileInfo["uid"] = uid;
                            /*** BEGIN tagTasks ***/
                                // Create tagTasks (promises) to get tagName for all tagsIds (for currentUid)
                            const tagTasks = [];
                            for (let tagId in likeProfileInfo.tagIds) {
                                let tagTask = new Promise ((resolve) => {
                                    resolve(db.getTagName(likeProfileInfo.tagIds[tagId]));
                                });
                                tagTasks.push(tagTask);
                            }
                            // After adding all tagTasks (promises) to the list, wait for all of them to resolve
                            // Return a list of tagNames, which is stored in employeeInfo
                            await Promise.all(tagTasks).then((tagNames) => likeProfileInfo["tags"] = tagNames);
                            /*** END tagTask ***/
                            resolve(likeProfileInfo);
                        });
                        infoTasks.push(infoTask);
                    }
                    // After adding all infoTasks (promises) to the list, wait for all of them to resolve
                    // Return a list of profileInfos
                    let likeProfileInfos = [];
                    await Promise.all(infoTasks).then((infos) => likeProfileInfos = infos);
                    /*** END infoTasks ***/
                    this.setState({
                        profiles: likeProfileInfos,
                        loading: false
                    });
                });
            }
        );
    }

    componentWillUnmount(){
        willFocusSubscription.remove();
    }


    render(){
        const {loading, profiles} = this.state;
        return (
            <Content contentContainerStyle={styles.ScrollContainer}>
                {
                    !loading ? <DataLoaded results={profiles} /> : <DataLoading />
                }
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    ScrollContainer: {
        flex: 1,
        paddingVertical: 20,
    },
});

const DataLoaded = ({results}) => (
    <LikeCard results={results}/>
);

const DataLoading = ({}) => (
    <View>
        <Spinner color={"black"} />
    </View>
);

export default compose() (Like)
