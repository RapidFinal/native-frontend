import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text, ScrollView} from "react-native";
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import CircularProfilePhoto from '../components/CircularProfilePhoto';
import ProjectSection from '../components/ProjectSection';
import DatabaseService from '../api/databaseService';

class ViewProfile extends React.Component {

    static propTypes = {
        imgUrl: PropTypes.string,
        fullName: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        experiences: PropTypes.array,
        skillSets: PropTypes.array,
        projects: PropTypes.array,
        tags: PropTypes.array,
    }

    state = {
        imgUrl: "https://st2.depositphotos.com/1006318/10458/v/950/depositphotos_104583834-stock-illustration-business-man-profile-icon-male.jpg",
        fullName: "",
        description: "",
        status: "",
        experiences: [],
        skillSets: ["Python", "Java"],
        projects: [],
        tags: []

    };

    componentWillMount() {
        let db = new DatabaseService
        db.getEmployeeInfo('uid3').then((result) => {
            console.log(result)
            this.setState({
                fullName: result.firstName + ' ' + result.lastName,
                description: result.description,
                status: result.status,
                experiences: result.experiences,
                projects: result.projects
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {imgUrl, fullName, status, description, experiences, skillSets, projects} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer}>
                <View style={styles.MainContainer}>
                    <CircularProfilePhoto url={imgUrl} diameter={150}/>
                    <Text style={styles.ProfileName}>
                        {fullName}
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
