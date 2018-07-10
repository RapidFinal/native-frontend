import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, ScrollView} from "react-native";
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import ProjectSection from '../components/ProjectSection';

class ViewProfile extends React.Component {

    static propTypes = {}

    state = {
        imgUrl: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        fullname: "FULLNAME",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        status: "Looking for job",
        experiences: [
            {
                title: "Web Development",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            },
            {
                title: "System Development",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
        ],
        skillSets: ["Python", "Java"],
        projects: [
            {
                name: "Notey",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
                date: "15/07/2018"
            },
            {
                name: "Tracker",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
                date: "20/07/2018"
            }
        ],

    };

    render() {
        const {imgUrl, fullname, status, description, experiences, skillSets, projects} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer}>
                <View style={styles.MainContainer}>
                    <CircularProfilePhoto url={imgUrl} diameter={150}/>

                    <Text style={styles.ProfileName}>
                        {fullname}
                    </Text>

                    <StatusText status={status}/>

                    <Text style={styles.Description}>
                        {description}
                    </Text>

                    <ExperiencesCard experiences={experiences}/>

                    <SkillSetsCard skills={skillSets}/>

                    <ProjectSection projects={projects}/>
                </View>
            </ScrollView>
        )
    }

}

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
    }
});

export default compose()(ViewProfile)
