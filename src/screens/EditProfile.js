import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {Spinner} from 'native-base';
import StatusText from '../components/StatusText';
import ExperiencesCard from '../components/ExperiencesCard';
import SkillSetsCard from '../components/SkillSetsCard';
import EditableCircularProfilePhoto from '../components/EditableCircularProfilePhoto';
import ProjectSection from '../components/ProjectSection';
import DatabaseService from '../api/databaseService';
import TagsSection from '../components/TagsSection';
import {Authentication} from '../api'

class EditProfile extends React.Component {

    static propTypes = {

    }

    state = {
        ready: true,
        imgUrl: "",
        fullName: "",
        description: "",
        status: "",
        experiences: [],
        skillSets: [],
        projects: [],
        tags: [],
        scrollView: null
    }

    updateExperienceState(newExp) {
        this.setState({
            experiences: newExp
        })
    }

    updateSkillSetsState(newSkills) {
        this.setState({
            skillSets: newSkills
        })
    }

    render(){
        const {ready, imgUrl, fullName, description, status, experiences, skillSets, projects, tags} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <ScrollView contentContainerStyle={styles.ScrollContainer} ref={scrollView => this.scrollView = scrollView}>
                {
                    ready ? (
                        <View style={styles.MainContainer}>
                            <EditableCircularProfilePhoto url={imgUrl} diameter={150}/>
                            <Text style={styles.ProfileName}>
                                {fullName}
                            </Text>
                            <StatusText status={status}/>
                            <Text style={styles.Description}>
                                {description}
                            </Text>
                            <TagsSection tags={tags}/>
                            <ExperiencesCard experiences={experiences}/>
                            <SkillSetsCard skills={skillSets}/>
                            <ProjectSection projects={projects} navigation={this.props.navigation}/>
                        </View>
                    ) : (
                        <DataLoading/>
                    )
                }
            </ScrollView>
        )
    }

}

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"} />
    </View>
);

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

export default compose() (EditProfile)
