import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "react-native";
import { Container, Button, Icon } from "native-base";

class ExperienceItem extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
	isEditable: PropTypes.bool,
    }

    render(){
	const {isEditable = false, title, desc} = this.props;
        return (
            <Container style={[styles.MainContainer, this.props.style]}>
                <Text style={styles.Title}>{title}</Text>
                <Text style={styles.Description}>{desc}</Text>
		{ (isEditable) && (
		    <Container>
		    <Button transparent>
                    <Icon name='ios-create'/>
                    </Button>
		    <Button transparent>
                    <Icon name='ios-trash'/>
		    </Button>
		    </Container>)
		}
            </Container>
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

    Title: {
        fontSize: 20,
        marginBottom: 3,
    },

    Description: {
        color: '#999999',
    }
});

export default compose() (ExperienceItem);
