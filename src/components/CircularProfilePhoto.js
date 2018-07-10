import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image} from "react-native";

class CircularProfilePhoto extends React.Component {

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Image source={{uri: this.props.url}}
                   style={{width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}}
            />
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (CircularProfilePhoto)
