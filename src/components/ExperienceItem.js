import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import ClickButton from "./ClickButton";
import { StyleSheet, View } from "react-native";
import { Container,Content, Button, Icon, Left, Right, ListItem } from "native-base";
import {TouchableOpacity, Text} from "react-native";
import {Icon as MaterialIcon} from 'react-native-elements';

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
            <View style={[styles.MainContainer, this.props.style]}>
                <View style={styles.TextSection}>
                    <Text style={styles.Title}>{title}</Text>
                    <Text style={styles.Description}>{desc}</Text>
                </View>
                {
                  isEditable && (
                      <View style={styles.RowAlign}>
                          {/*<ExperienceEdit iconStyle={{ fontSize: 24 }} onPress={onEdit} />*/}
                          <TouchableOpacity
                              onPress={() => {
                                  onEdit()
                              }}
                          >
                              <Icon
                                  type="FontAwesome"
                                  name='edit'
                                  style={[styles.EditIcon, styles.EditIconPosition]}
                              />
                          </TouchableOpacity>
                          {/*<ExperienceDelete iconStyle={{ fontSize: 24 }} onPress={onDelete} />*/}
                          <TouchableOpacity
                              onPress={() => {
                                  onDelete()
                              }}
                          >
                              <MaterialIcon
                                  name='remove-circle-outline'
                                  color='#517fa4'
                              />
                          </TouchableOpacity>
                      </View>
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
        fontSize: 18,
        marginBottom: 3,
    },

    Description: {
        color: '#999999',
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
    },

    EditIconPosition: {
        marginRight: 10,
    },

    EditIcon: {
        fontSize: 25,
    },

    TextSection: {
        width: '80%',
    },
});

export default compose() (ExperienceItem);
