import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image, View} from "react-native";

class CircularProfilePhoto extends React.Component {

    static propTypes = {
        url: PropTypes.string,
        diameter: PropTypes.number
    }

    render(){
        return (
            <View>
                {this.props.url === "" ? (
                    <Image
                        source={require('../assets/images/default.jpeg')}
                        style={{width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}}
                    />
                ) : (
                    <Image
                        source={{uri: this.props.url}}
                        style={{width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}}
                    />
                    )
                }
            </View>

        )
    }
}

export default compose() (CircularProfilePhoto)
