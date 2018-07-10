import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist'
import firebase from 'react-native-firebase';
import SnackBar from 'react-native-snackbar-component'
import ActionSheet from 'react-native-actionsheet'

// TODO: Delete test_like & get the correct db.ref()
const currentUser = "user1";
const likeProfilesRef = firebase.database().ref('test_like/profile/' + currentUser + "/like_profiles");

let deleteSnackbarTimer;
let restoreSnackbarTimer;

class Like extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            profiles : [],

            // Undo related
            undoPressed: false,
            lastRemovedIndex: -1,
            profileBackup: null,
            deleteSnackbarMessage: "",
            restoreSnackbarMessage: "",
            showDeleteSnackbar: false,
            showRestoreSnackbar: false
        };
        this.actionSheetRefs = {};
    }

    componentDidMount() {
        this._mounted = true;
        this.updateOrder.bind(this);
        likeProfilesRef.orderByChild("orderKey").on('child_added', snapshot => {
            let profile = { id: snapshot.key, content: snapshot.child("name").val(), orderKey: snapshot.child("orderKey").val()};
            if (this.state.undoPressed) {
                this.insertProfileToIndex(profile);
                if (this._mounted) this.setState({undoPressed: false});
            }
            else {
                if (this._mounted) this.setState({profiles: this.state.profiles.concat([profile])});
            }
        })
    }

    componentWillUnmount(){
        this._mounted = false;
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <DraggableFlatList
                    data={this.state.profiles}
                    renderItem={({item, index, move, moveEnd}) =>
                        <TouchableOpacity onPress={this.showActionSheet.bind(this, index)}
                                          style={styles.horizontalProfileCard}
                                          onLongPress={move}
                                          delayLongPress={400}
                                          onPressOut={moveEnd}
                        >
                            <Text style={styles.profileContentPlaceHolder}>{item.content}</Text>
                            <Button
                                title="Delete"
                                onPress={this.showDeleteAlert.bind(this,index)}
                                style={styles.deleteButton}
                            />
                            <ActionSheet
                                ref={o => this.actionSheetRefs[index] = o}
                                options={['Cancel', 'Go to profile', 'Move up', 'Move down']}
                                title= {item.content}
                                cancelButtonIndex={0}
                                onPress={(buttonIndex) => {
                                    if (buttonIndex === 1) this.goToProfile();
                                    if (buttonIndex === 2) this.moveItem("up", index);
                                    if (buttonIndex === 3) this.moveItem("down", index);
                                }}
                            />
                        </TouchableOpacity>}
                    keyExtractor={item => item.id}
                    onMoveEnd={
                        ({ data }) => this.updateOrder(data)
                    }
                />
                <SnackBar visible={this.state.showDeleteSnackbar} textMessage={this.state.deleteSnackbarMessage} accentColor="green" actionHandler={()=>this.restoreProfileToDB()} actionText="Undo"/>
                <SnackBar visible={this.state.showRestoreSnackbar} textMessage={this.state.restoreSnackbarMessage} accentColor="green" actionHandler={
                    () => {if (this._mounted) this.setState({showRestoreSnackbar: false});}
                } actionText="Close"/>
            </View>
        );
    }

    showActionSheet = (index) => {
        this.actionSheetRefs[index].show()
    };

    goToProfile = () => {
        this.props.navigation.navigate("View");
    };

    moveItem = (direction, index) => {
        if (direction === "up" && index === 0) return;
        if (direction === "down" && index === this.state.profiles.length - 1) return;

        const currentItem = this.state.profiles[index];
        let nextItem;
        if (direction === "up") nextItem = this.state.profiles[index-1];
        else /*direction === "down"*/ nextItem = this.state.profiles[index+1];

        let temp = currentItem.orderKey;
        currentItem.orderKey = nextItem.orderKey;
        nextItem.orderKey = temp;

        if (direction === "up") this.state.profiles[index-1] = currentItem;
        else /*direction === "down"*/ this.state.profiles[index+1] = currentItem;
        this.state.profiles[index] = nextItem;
        likeProfilesRef.child(currentItem.id).update({"orderKey": currentItem.orderKey});
        likeProfilesRef.child(nextItem.id).update({"orderKey": nextItem.orderKey});
        this.forceUpdate();
    };

    updateOrder = (data) => {
        for (let i = 0; i < data.length; i++) {
            let currentProfile = data[i];
            likeProfilesRef.child(currentProfile.id).update({"orderKey": i});
            data[i].orderKey = i;
        }
        if (this._mounted) this.setState({ profiles : data });
    };

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
    horizontalProfileCard: {
        height: 150,
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        borderTopWidth: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        width: '20%',
    },
    profileContentPlaceHolder: {
        width: '80%',
        textAlign: 'center'
    }
});

export default compose() (Like)
