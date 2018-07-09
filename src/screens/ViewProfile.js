import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, Picker, PickerIOS} from "react-native";

class ViewProfile extends React.Component {

    static propTypes = {

    }

    state = {
        imgUrl: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        fullname: "FULLNAME",
        description: "DESCRIPTION",
        status: ["Looking for job", "Looking for opportunity", "Not looking for job"],
        experience: [
            {
                title: "EXPERIENCE 1",
                description: "EXPERIENCE DESCRIPTION 1"
            }
        ],
        skillSets: ["SKILL 1", "SKILL 2"],
        project: [
            {
                name: "PROJECT 1",
                description: "PROJECT DESCRIPTION 1",
                date: ""
            }
        ],
        currentStatus: ""
    };

    render(){
        const {imgUrl, fullname, status, currentStatus} = this.state;

        let statusItems = [];

        status.forEach((value, index) => {
            statusItems.push(<Picker.Item label={value} value={value}/>)
        });

        return (
            <View style={styles.MainContainer}>
                <Image source={{uri: imgUrl}}
                       style={{width: 150, height: 150, borderRadius: 150/2}}
                />
                <Text style={styles.ProfileName}>
                    {fullname}
                </Text>
                <Picker
                    selectedValue={currentStatus}
                    style={styles.StatusPicker}
                    onValueChange={(itemValue, itemIndex) => this.setState({currentStatus: itemValue})}>
                    {statusItems}
                </Picker>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    ProfileName: {
        marginTop: 20,
        fontSize: 26,
    },

    StatusPicker: {
        height: 50,
        width: 200,
    }

});

export default compose() (ViewProfile)
