import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import ClickButton from "./ClickButton";
import { StyleSheet, View } from "react-native";
import { Container,Content, Text, Button, Icon, Left, Right, ListItem } from "native-base";

ExperienceEdit = ({onPress, iconStyle}) => (
    <ClickButton transparent onPress={onPress} >
        <Icon name={"edit"} type={"FontAwesome"} style={iconStyle}/>
    </ClickButton>
);

ExperienceDelete = ({onPress, iconStyle}) => (
    <ClickButton transparent onPress={onPress} >
        <Icon name={"delete"} type={"MaterialCommunityIcons"} style={iconStyle}/>
    </ClickButton>
);

class ExperienceItem extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        isEditable: PropTypes.bool,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
    };



    render(){
      const {isEditable = false, title, desc, onDelete=()=>{}, onEdit=()=>{}} = this.props;
        return (
            <View style={styles.MainContainer}>
                <Left>
                    <Text styles={styles.Title}>{title}</Text>
                    <Text styles={styles.Description}>{desc}</Text>
                </Left>
                {
                  isEditable && (
                      <Right style={styles.ExperienceHeader}>
                          <ExperienceEdit iconStyle={{ fontSize: 24 }} onPress={onEdit} />
                          <ExperienceDelete iconStyle={{ fontSize: 24 }} onPress={onDelete} />
                      </Right>
                  )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    EditContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    Title: {
        fontSize: 20,
        marginBottom: 3,
    },
    Description: {
        color: '#999999',
    },
    ExperienceHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default compose() (ExperienceItem);
