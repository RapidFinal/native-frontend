import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Icon, Text} from "native-base";

class BackButton extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const {} = this.state;
        return (
            <Button
                iconLeft
                onPress={this.props.onPress}
            >
                <Icon name='arrow-back' />
                <Text>Back</Text>
            </Button>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (BackButton)
