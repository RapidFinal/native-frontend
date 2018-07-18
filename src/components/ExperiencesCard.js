import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "react-native";
import ExperienceItem from '../components/ExperienceItem';

class ExperiencesCard extends React.Component {

    static propTypes = {
	experiences: PropTypes.array.isRequired,
	isEditable: PropTypes.bool.isRequired,
    }

    render() {
	console.log(`ExperiencesCard ${this.props.experiences}`, this.props.experiences);
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Experiences</Text>
                {this.props.experiences.map((value, index) => {
                    if (index === this.props.experiences.length -1) {
                        return (
                            <ExperienceItem
                                style={styles.Item}
                                title={value.title}
                                desc={value.description}
                                key={index.toString()}
                            />
                        );
                    } else {
                        return (
                            <ExperienceItem
                                style={[styles.Item, styles.DividerLine]}
                                title={value.title}
                                desc={value.description}
                                key={index.toString()}
                            />
                        );
                    }

                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        maxWidth: '90%',
        width: '90%',
        backgroundColor: '#F3F3F3',
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    Item: {
        marginBottom: 10,
    },

    DividerLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
    }
});

export default compose()(ExperiencesCard);
