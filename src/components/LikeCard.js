import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Alert, View} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';
import SnackBar from 'react-native-snackbar-component'
import ActionSheet from "react-native-actionsheet";
import { withNavigation } from 'react-navigation';
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'

let deleteSnackbarTimer;
let restoreSnackbarTimer;

class LikeCard extends Component {

    static propTypes = {
        results: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            profiles : this.props.results,
            // Undo related
            lastRemovedIndex: -1,
            profileBackup: null,
            deleteSnackbarMessage: "",
            restoreSnackbarMessage: "",
            showDeleteSnackbar: false,
            showRestoreSnackbar: false
        };
        this.db = new DatabaseService;
        this.currentUser = Authentication.currentUser();
        this.actionSheetRefs = {};
    }

    render() {
        const {profiles} = this.state;
        if (profiles.length === 0) return (
            <View style = {styles.NothingContainer}>
                <Text>
                    Nothing here, but us chickens
                </Text>
                <SnackBar visible={this.state.showDeleteSnackbar} textMessage={this.state.deleteSnackbarMessage}
                          accentColor="green" actionHandler={() => this.restoreProfileToDB()} actionText="Undo"/>
                <SnackBar visible={this.state.showRestoreSnackbar} textMessage={this.state.restoreSnackbarMessage}
                          accentColor="green" actionHandler={
                    () => {
                        this.setState({showRestoreSnackbar: false});
                    }
                } actionText="Close"/>
            </View>
        );
        else {
            return (
                <SafeAreaView style={styles.container}>
                    <Content style={styles.container}>
                        { this.state.profiles.map( (i, d) =>
                            <Card key={d}>
                                <CardItem bordered button onPress={this.showActionSheet.bind(this,d)}>
                                    <Left>
                                        <Thumbnail style={styles.thumbnail}
                                                   source={ (i.imgUrl) ? {uri: i.imgUrl} : require('../static/placeholder.png')}/>
                                        <Body>
                                        <Text>{i.firstName} {i.lastName}</Text>
                                        <Text note style={styles.statusText}>
                                            {i.status} <Icon name='circle' color='green' style={{fontSize: 12, color: 'green'}}/>
                                        </Text>
                                        <Text note style={styles.majorText}>{i.major}</Text>
                                        <Tags
                                            initialTags={(i.tags) ? i.tags : []}
                                            readonly={true}
                                            tagTextStyle={{fontSize: 11}}
                                            onTagPress={() => {return null;}}
                                        />
                                        </Body>
                                    </Left>
                                </CardItem>
                                <ActionSheet
                                    ref={o => this.actionSheetRefs[d] = o}
                                    options={['Cancel', 'Go to profile', "Remove"]}
                                    title= {i.firstName + " " + i.lastName}
                                    cancelButtonIndex={0}
                                    onPress={(buttonIndex) => {
                                        if (buttonIndex === 1) this.goToProfile(i.uid);
                                        if (buttonIndex === 2) this.showDeleteAlert(d);
                                    }}
                                />
                            </Card>
                        )}
                    </Content>
                    <SnackBar visible={this.state.showDeleteSnackbar} textMessage={this.state.deleteSnackbarMessage} accentColor="green" actionHandler={()=>this.restoreProfileToDB()} actionText="Undo"/>
                    <SnackBar visible={this.state.showRestoreSnackbar} textMessage={this.state.restoreSnackbarMessage} accentColor="green" actionHandler={
                        () => {this.setState({showRestoreSnackbar: false});}
                    } actionText="Close"/>
                </SafeAreaView>
            )
        }
    }

    showActionSheet = (index) => {
        this.actionSheetRefs[index].show()
    };

    goToProfile = (uid) => {
        this.props.navigation.navigate('View', { uid: uid});
    };

    restoreProfileToDB = () => {
        const profileBackup = this.state.profileBackup;
        this.db.likedEmployee(this.currentUser.uid, profileBackup.uid);
         this.setState({
            restoreSnackbarMessage: profileBackup.firstName + " " + profileBackup.lastName + " was restored",
            showDeleteSnackbar: false,
            showRestoreSnackbar: true,
        });
        this.insertProfileToIndex(profileBackup);
        clearTimeout(restoreSnackbarTimer);
        restoreSnackbarTimer = setTimeout(() => {this.setState({showRestoreSnackbar: false});}, 2000);
    };


    insertProfileToIndex = (profile) => {
        const profilesClone = this.state.profiles.slice();
        profilesClone.splice(this.state.lastRemovedIndex, 0, profile);
        this.setState({profiles: profilesClone});
    };

    removeLike = (index) => {
        const profilesClone = this.state.profiles.slice();
        const profileBackup = Object.assign(this.state.profiles[index]);
        const profileName = profileBackup.firstName + " " + profileBackup.lastName;
        profilesClone.splice(index, 1);
        this.db.unLikedEmployee(this.currentUser.uid, profileBackup.uid);
        this.setState({
            profiles: profilesClone,
            lastRemovedIndex: index,
            profileBackup: profileBackup,
            deleteSnackbarMessage: profileName + " was deleted",
            showDeleteSnackbar: true,
            showRestoreSnackbar: false
        });
        clearTimeout(deleteSnackbarTimer);
        deleteSnackbarTimer = setTimeout(() => {this.setState({showDeleteSnackbar: false});}, 5000);
    };

    showDeleteAlert = (index) => {
        const profile = this.state.profiles[index];
        const profileName = profile.firstName + " " + profile.lastName;
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
    NothingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    thumbnail: {
        width: 105,
        height: 105,
        borderRadius: 105/2
    },
    statusText:{
        fontSize: 12,
        color: 'black'
    },
    majorText: {
        fontSize: 12
    },
    tagText: { // Not currently used due to throwing warning
        fontSize: 11
    }
});

export default compose() (withNavigation(LikeCard))
