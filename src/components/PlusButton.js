import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Icon} from "native-base";

class PlusButton extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {style, onPress} = this.props;
        return (
            <Button
                rounded
                style={style}
                onPress={onPress}
            >
                <Icon name='md-add' />
            </Button>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (PlusButton)
