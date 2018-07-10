import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text} from "react-native";
import ProjectCard from './ProjectCard';

class ProjectSection extends React.Component {

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Projects</Text>
                {
                    this.props.projects.map((value, index) => {
                        return (
                            <ProjectCard title={value.name}
                                         description={value.description}
                                         date={value.date}
                                         key={value.name}
                            />
                        )
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        maxWidth: '90%',
        width: '90%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    Title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

export default compose()(ProjectSection)
