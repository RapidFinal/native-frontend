import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image} from "react-native";

class CircularProfilePhoto extends React.Component {

    static propTypes = {
        url: PropTypes.string,
        diameter: PropTypes.number
    }

    render(){
        return (
            <Image source={{uri: this.props.url}}
                   style={{width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}}
            />
        )
    }
}

export default compose() (CircularProfilePhoto)
