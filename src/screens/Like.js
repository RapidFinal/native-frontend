import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist'
import firebase from 'react-native-firebase';
import SnackBar from 'react-native-snackbar-component'

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
            profileBackup: null,
            deleteSnackbarMessage: "",
            restoreSnackbarMessage: "",
            showDeleteSnackbar: false,
            showRestoreSnackbar: false
        };
    }

    componentDidMount() {
        this.updateOrder.bind(this);
        likeProfilesRef.orderByChild("orderKey").on('child_added', snapshot => {
            let profile = { id: snapshot.key, content: snapshot.child("name").val(), orderKey: snapshot.child("orderKey").val()};
            if (this.state.undoPressed) {
                this.insertProfileToIndex(profile);
                this.setState({undoPressed: false});
            }
            else {
                this.setState({profiles: this.state.profiles.concat([profile])});
            }
        })
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <DraggableFlatList
                    data={this.state.profiles}
                    renderItem={({item, index, move, moveEnd}) =>
                        <TouchableOpacity onPress={this.goToProfile}
                                          style={styles.horizontalProfileCard}
                                          onLongPress={move}
                                          delayLongPress={200}
                                          onPressOut={moveEnd}
                        >
                            <Text style={styles.profileContentPlaceHolder}>{item.content}</Text>
                            <Button
                                title="Delete"
                                onPress={this.showDeleteAlert.bind(this,index)}
                                style={styles.deleteButton}
                            />
                        </TouchableOpacity>}
                    keyExtractor={item => item.id}
                    onMoveEnd={
                        ({ data }) => this.updateOrder(data)
                    }
                />
                <SnackBar visible={this.state.showDeleteSnackbar} textMessage={this.state.deleteSnackbarMessage} accentColor="green" actionHandler={()=>this.restoreProfileToDB()} actionText="Undo"/>
                <SnackBar visible={this.state.showRestoreSnackbar} textMessage={this.state.restoreSnackbarMessage} accentColor="green" actionHandler={()=>this.setState({showRestoreSnackbar: false})} actionText="Close"/>
            </View>
        );
    }

    goToProfile = () => {
        this.props.navigation.navigate("View");
    };

    updateOrder = (data) => {
        for (let i = 0; i < data.length; i++) {
            let currentProfile = data[i];
            likeProfilesRef.child(currentProfile.id).update({"orderKey": i});
            data[i].orderKey = i;
        }
        this.setState({ profiles : data });
    };

    insertProfileToIndex = (profile) => {
        const profilesClone = this.state.profiles.slice();
        profilesClone.splice(profile.orderKey, 0, profile);
        this.setState({profiles: profilesClone});
    };

    restoreProfileToDB = () => {
        const profileBackup = this.state.profileBackup;
        likeProfilesRef.child(profileBackup.id).set({name: profileBackup.content, orderKey: profileBackup.orderKey});
        this.setState({
            undoPressed: true,
            restoreSnackbarMessage: profileBackup.content + " was restored",
            showDeleteSnackbar: false,
            showRestoreSnackbar: true,
        });
        clearTimeout(restoreSnackbarTimer);
        restoreSnackbarTimer = setTimeout(() => this.setState({showRestoreSnackbar: false}), 2000);
    };

    removeLike = (index) => {
        const profilesClone = this.state.profiles.slice();
        const profileBackup = Object.assign(this.state.profiles[index]);
        const profileName = profileBackup.content;
        profilesClone.splice(index, 1);
        likeProfilesRef.child(this.state.profiles[index].id).remove();
        this.setState({
            profiles: profilesClone,
            profileBackup: profileBackup,
            deleteSnackbarMessage: profileName + " was deleted",
            showDeleteSnackbar: true,
            showRestoreSnackbar: false
        });
        clearTimeout(deleteSnackbarTimer);
        deleteSnackbarTimer = setTimeout(() => this.setState({showDeleteSnackbar: false}), 5000);
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
