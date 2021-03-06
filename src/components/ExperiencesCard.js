import React from 'react';
import compose from 'recompose/compose';
import hoistStatics from 'recompose/hoistStatics';
import { withContext } from '../context/withContext';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Alert, TouchableOpacity} from "react-native";
import ExperienceItem from './ExperienceItem';
import DatabaseService from '../api/databaseService';
import {Icon as MaterialIcon} from 'react-native-elements';

const TitleBar = ({isEditable, children, onPress}) => (
    <View style={styles.RowAlign}>
        <Text style={[styles.Title, {marginRight: 10}]}>
            {children}
        </Text>
        {
            isEditable && (
                <TouchableOpacity transparent onPress={onPress}>
                    <MaterialIcon name={"add-circle-outline"} color='#517fa4'/>
                </TouchableOpacity>
            )
        }
    </View>
);

class ExperiencesCard extends React.Component {

    static propTypes = {
        experiences: PropTypes.array.isRequired,
        isEditable: PropTypes.bool,
        showModal: PropTypes.func,
        triggerRefresh: PropTypes.func,
    }

    state = {
        modalVisible: false,
    }

    onDelete = (experienceID, name) => () => {
        let db = new DatabaseService();
        const uid =  this.props.context.currentUser.uid;
        Alert.alert(
            `Delete \"${name}\"?`,
            "Deleting this experience is permanent!",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Delete', onPress: () => {
                    db.deleteEmployeeExperience(uid, experienceID);
                    this.props.triggerRefresh()
                }, style: 'destructive'}
            ],
            { cancelable: false }
        )
    }

    onEdit = (experience) => () => {
        console.log(`Edit experience ${experience}`, experience);
        this.props.showModal(experience.title, experience.description, experience.id);
    }


    render() {
        //console.log(`ExperiencesCard ${this.props.experiences}`, this.props.experiences);
        const {isEditable = false, showModal} = this.props;
        return (
            <View style={styles.MainContainer}>
                <TitleBar isEditable={isEditable} onPress={()=>showModal("","")}>Experiences</TitleBar>
                {this.props.experiences.map((value, index) => {
                    if (index === this.props.experiences.length -1) {
                        return (
                            <ExperienceItem
                                style={styles.Item}
                                title={value.title}
                                desc={value.description}
                                key={index.toString()}
                                isEditable={isEditable}
                                onDelete={this.onDelete(value.id, value.title)}
                                onEdit={this.onEdit(value)}
                            />
                        );
                    } else {
                        return (
                            <ExperienceItem
                                style={[styles.Item, styles.DividerLine]}
                                title={value.title}
                                desc={value.description}
                                key={index.toString()}
                                isEditable={isEditable}
                                onDelete={this.onDelete(value.id, value.title)}
                                onEdit={this.onEdit(value)}
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
        marginBottom: 20,
    },

    DividerLine: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 15,
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    AddIconPosition: {
        alignSelf: 'flex-end',
    }
});

export default hoistStatics(compose(withContext))(ExperiencesCard);
