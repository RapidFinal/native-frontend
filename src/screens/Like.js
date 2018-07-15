import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from "react-native";
import LikeCard from "../components/LikeCard";
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import {Content, Spinner} from "native-base";

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
        const likeProfilesInfo = [];
        //db.likedEmployee(currentUser.uid, "woHMJwCUIigvifkWduoRAzedYS93");
        //db.likedEmployee(currentUser.uid, "xsxm38N1FrbRKdUzYSmUZX9NlqN2");
        db.getLikedEmployee(currentUser.uid).then(async (likeProfiles) => {
            for (let uid in likeProfiles) {
                let employeeInfo = await db.getEmployeeInfo(uid);
                employeeInfo["uid"] = uid;
                likeProfilesInfo.push(employeeInfo);
            }
            this.setState({
                profiles: likeProfilesInfo,
                loading: false
            });
        });
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
    NothingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

const DataLoaded = ({results}) => {
    if (results.length === 0) return (
        <View style = {styles.NothingContainer}>
            <Text>
                Nothing here, but us chickens
            </Text>
        </View>
    );
     else {
        return (<LikeCard results={results}/>)
    }
};

const DataLoading = ({}) => (
    <View>
        <Spinner color={"black"} />
    </View>
);

export default compose() (Like)
