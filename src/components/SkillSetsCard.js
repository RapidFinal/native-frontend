import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from "react-native";

class SkillSetsCard extends React.Component {

    static propTypes = {
        skills: PropTypes.array,
    }

    render(){
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Skill Sets</Text>
                {this.props.skills.map((value, index) => {
                    if (index === this.props.skills.length -1) {
                        return (
                            <Text
                                style={styles.Item}
                                key={value.id}
                            >
                                {value.skill}
                            </Text>
                        )
                    } else {
                        return (
                            <Text
                                style={[styles.Item, styles.DividerLine]}
                                key={value.id}
                            >
                                {value.skill}
                            </Text>
                        )
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
        marginBottom: 8,
        fontSize: 20,
        paddingLeft: 10,
    },

    DividerLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
    }
});

export default compose() (SkillSetsCard)
