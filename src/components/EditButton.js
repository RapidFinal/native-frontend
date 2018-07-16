import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Icon, Text} from "native-base";

class EditButton extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const {} = this.state;
        return (
            <Button
                transparent
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Icon type="FontAwesome" name='edit' />
            </Button>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginVertical: 40,
    }
});

export default compose() (EditButton)
