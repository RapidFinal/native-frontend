import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, TouchableOpacity} from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist'
import firebase from 'react-native-firebase';

// TODO: Delete test_like & get the correct db.ref()
const currentUser = "user1";
const likeProfilesRef = firebase.database().ref('test_like/profile/' + currentUser + "/like_profiles");

class Like extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            profiles : []
        };
    }

    componentDidMount() {
        this.updateOrder.bind(this);
        likeProfilesRef.orderByChild("orderKey").on('child_added', snapshot => {
            let profile = { id: snapshot.key, content: snapshot.child("name").val()};
            this.setState({ profiles: this.state.profiles.concat([profile])});
        })
    }

    render(){
        return (
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
                            onPress={this.removeLike.bind(this,index)}
                            style={styles.deleteButton}
                        />
                    </TouchableOpacity>}
                keyExtractor={item => item.id}
                onMoveEnd={
                    ({ data }) => this.updateOrder(data)
                }
            />
        );
    }

    goToProfile = () => {
        this.props.navigation.navigate("View");
    };

    updateOrder = (data) => {
        for (let i = 0; i < data.length; i++) {
            let currentProfile = data[i];
            likeProfilesRef.child(currentProfile.id).update({"orderKey": i})
        }
        this.setState({ profiles : data });
    };

    removeLike = (index) => {
        const profilesClone = this.state.profiles.slice();
        profilesClone.splice(index, 1);
        likeProfilesRef.child(this.state.profiles[index].id).remove();
        this.setState({
            profiles: profilesClone
        });
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
