import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";

class ViewProfile extends React.Component {

    static propTypes = {

    }

    state = {
        img_url: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        fullname: "FULLNAME",
        description: "DESCRIPTION",
        experience: [
            {
                title: "EXPERIENCE 1",
                description: "EXPERIENCE DESCRIPTION 1"
            }
        ],
        skill_sets: ["SKILL 1", "SKILL 2"],
        project: [
            {
                name: "PROJECT 1",
                description: "PROJECT DESCRIPTION 1",
                date: ""
            }
        ]
    };

    render(){
        const {img_url} = this.state;
        return (
            <image
                style={{borderBottomLeftRadius: '50%',
                        borderBottomRightRadius: '50%',
                        borderTopLeftRadius: '50%',
                        borderTopRightRadius: '50%'
                }}
                source={{uri: img_url}}
            />

        )
    }

}

const styles = StyleSheet.create({
});

export default compose() (ViewProfile)
