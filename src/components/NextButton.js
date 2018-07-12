import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Button, Icon, Text} from "native-base";

class NextButton extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const {} = this.state;
        return (
            <Button
                style={styles.button}
                iconRight
                onPress={this.props.onPress}
            >
                <Text>Next</Text>
                <Icon name='arrow-forward' />
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

export default compose() (NextButton)
