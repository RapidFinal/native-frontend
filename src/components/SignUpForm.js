import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Form, Text} from "native-base";

class SignUpForm extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {children} = this.props;
        return (
            <Form style={styles.form}>
                {children}
            </Form>
        )
    }

}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 40,
        marginTop: 20,
    }
});

export default compose() (SignUpForm)
