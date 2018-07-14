import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Alert, Button, StyleSheet, View} from "react-native";
import SnackBar from 'react-native-snackbar-component'
import SearchCard from "../components/SearchCard";
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import {Content, Spinner} from "native-base";

let deleteSnackbarTimer;
let restoreSnackbarTimer;

// TODO: Remove action sheet, reordering

class Like extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            profiles : [],
            loading: true,
            // Undo related
            undoPressed: false,
            lastRemovedIndex: -1,
            profileBackup: null,
            deleteSnackbarMessage: "",
            restoreSnackbarMessage: "",
            showDeleteSnackbar: false,
            showRestoreSnackbar: false
        };
    }

    componentDidMount() {
        this._mounted = true;
        const db = new DatabaseService;
        const currentUser = Authentication.currentUser();
        const likeProfilesInfo = [];
        db.getLikedEmployee(currentUser.uid).then(async (likeProfiles) => {
            for (let uid in likeProfiles) {
                let employeeInfo = await db.getEmployeeInfo(uid);
                likeProfilesInfo.push(employeeInfo);
            }
            this.setState({
                profiles: likeProfilesInfo,
                loading: false
            });
        });


    }

    componentWillUnmount(){
        this._mounted = false;
    }

    render(){
        const {loading, profiles} = this.state;
        return (
            <Content contentContainerStyle={styles.ScrollContainer}>
                {
                    !loading ? <DataLoaded results={profiles} /> : <DataLoading />
                }
                <SnackBar visible={this.state.showDeleteSnackbar} textMessage={this.state.deleteSnackbarMessage} accentColor="green" actionHandler={()=>this.restoreProfileToDB()} actionText="Undo"/>
                <SnackBar visible={this.state.showRestoreSnackbar} textMessage={this.state.restoreSnackbarMessage} accentColor="green" actionHandler={
                    () => {if (this._mounted) this.setState({showRestoreSnackbar: false});}
                } actionText="Close"/>
            </Content>
        );
    }

    insertProfileToIndex = (profile) => {
        const profilesClone = this.state.profiles.slice();
        profilesClone.splice(this.state.lastRemovedIndex, 0, profile);
        if (this._mounted) this.setState({profiles: profilesClone});
    };

    restoreProfileToDB = () => {
        const profileBackup = this.state.profileBackup;
        likeProfilesRef.child(profileBackup.id).set({name: profileBackup.content, orderKey: profileBackup.orderKey});
        if (this._mounted) this.setState({
            undoPressed: true,
            restoreSnackbarMessage: profileBackup.content + " was restored",
            showDeleteSnackbar: false,
            showRestoreSnackbar: true,
        });
        clearTimeout(restoreSnackbarTimer);
        restoreSnackbarTimer = setTimeout(() => {if (this._mounted) this.setState({showRestoreSnackbar: false});}, 2000);
    };

    removeLike = (index) => {
        const profilesClone = this.state.profiles.slice();
        const profileBackup = Object.assign(this.state.profiles[index]);
        const profileName = profileBackup.content;
        profilesClone.splice(index, 1);
        likeProfilesRef.child(this.state.profiles[index].id).remove();
        if (this._mounted) this.setState({
            profiles: profilesClone,
            lastRemovedIndex: index,
            profileBackup: profileBackup,
            deleteSnackbarMessage: profileName + " was deleted",
            showDeleteSnackbar: true,
            showRestoreSnackbar: false
        });
        clearTimeout(deleteSnackbarTimer);
        deleteSnackbarTimer = setTimeout(() => {if (this._mounted) this.setState({showDeleteSnackbar: false});}, 5000);
    };

    showDeleteAlert = (index) => {
        const profileName = this.state.profiles[index].content;
        Alert.alert(
            'Delete',
            'Are you sure you want to delete ' + profileName + "?",
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'OK', onPress: () => this.removeLike(index)},
            ]
        )
    };

}

const styles = StyleSheet.create({
    ScrollContainer: {
        paddingVertical: 20,
    },

    MainContainer: {
        flex: 1,
    },
});

const DataLoaded = ({results}) => (
    <View style={styles.MainContainer}>
        <SearchCard results={results}/>
    </View>
);

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

export default compose() (Like)
