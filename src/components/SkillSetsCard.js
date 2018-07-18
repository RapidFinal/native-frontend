import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import {Body, Left, Right, Icon} from "native-base";
import ClickButton from "./ClickButton";
import DatabaseService from '../api/databaseService'
import {Authentication} from "../api";

const TitleBar = ({editable, children, onAddSkill}) => (
    <View style={styles.skillSetHeader}>
        <Left>
            <Text style={styles.Title}>
                {children}
            </Text>
        </Left>
        <Body />
        <Right>
            {
                editable && (
                    <ClickButton transparent onPress={onAddSkill}>
                        <Icon name={"add"} type={"MaterialIcons"} />
                    </ClickButton>
                )
            }
        </Right>
    </View>
);

const SkillText = ({isLast, children, ...rest}) => (
    <Text
        style={[styles.Item, isLast ? styles.DividerLine : {}]}
        {...rest}
    >
        {children}
    </Text>
);

const SkillDelete = ({onPress}) => (
    <ClickButton transparent onPress={onPress} >
        <Icon name={"delete"} type={"MaterialCommunityIcons"} />
    </ClickButton>
);

const SkillEdit = ({onPress}) => (
    <ClickButton transparent onPress={onPress} >
        <Icon name={"edit"} type={"FontAwesome"} />
    </ClickButton>
);

const SkillCard = ({editable, id, isLast, onDelete, onEdit, children,...rest}) => (
    <View>
        <Left>
            <SkillText isLast={isLast} {...rest}>{children}</SkillText>
        </Left>
        {
            editable && (
                <Right>
                    <SkillEdit onPress={onEdit(id, children)} />
                    <SkillDelete onPress={onDelete(id)} />
                </Right>
            )
        }
    </View>
)

class SkillSetsCard extends React.Component {

    static propTypes = {
        skills: PropTypes.array,
    };

    showModal = () => {
        this.props.onOpenModal();
        this.props.setSkillInput("");
    }

    editSkill = (id, value) => () => {
        this.props.onCurrentEditSkill(id);
        this.props.setSkillInput(value);
        this.props.onOpenModal();
    };

    deleteSkill = (skillId) => () => {
        const db = new DatabaseService();
        const uid = Authentication.currentUser().uid;

        db.deleteEmployeeSkillSet(uid, skillId)
    };

    render(){
        const {skills: {length: skillLength}, skills, editable} = this.props
        return (
            <View style={styles.MainContainer}>
                <TitleBar editable={editable} onAddSkill={this.showModal}>Skill Sets</TitleBar>
                <View>
                    {
                        skills.map((v, i) => (
                            <SkillCard
                                editable={editable}
                                key={i}
                                id={v.id}
                                isLast={i === skillLength - 1}
                                onEdit={this.editSkill}
                                onDelete={this.deleteSkill}>{v.skill}</SkillCard>
                        ))
                    }
                </View>
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
    },
    skillSetHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default compose() (SkillSetsCard)
