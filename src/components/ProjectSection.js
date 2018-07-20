import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text} from "react-native";
import ProjectCard from './ProjectCard';

class ProjectSection extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
    }

    render() {
        const {projects} = this.props;
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Projects</Text>
                {
                    projects.map((value, index) => {
                        console.log(value);
                        return (
                            <ProjectCard title={value.name}
                                         description={value.description}
                                         date={value.date}
                                         links={value.links}
                                         tagIds={value.tagIds}
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
