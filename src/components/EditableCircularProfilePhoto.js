import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image, StyleSheet, View} from "react-native";

class CircularProfilePhoto extends React.Component {

    static propTypes = {
        url: PropTypes.string,
        diameter: PropTypes.number
    }

    render(){
        return (
            <View>
                {this.props.url === "" ? (
                    <View>
                        <Image
                            source={require('../assets/images/default.jpeg')}
                            style={[styles.under, {width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}]}
                        />
                        <Image source={require('../assets/images/camera.png')}
                            style={[styles.over, {width: this.props.diameter / 3, height: this.props.diameter / 3, borderRadius: this.props.diameter / 6}]}
                        />
                    </View>
                ) : (
                    <View>
                        <Image
                            source={{uri: this.props.url}}
                            style={{width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter / 2}}
                        />
                    </View>
                )
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    under: {
        zIndex: -1
    },

    over: {
        position: 'absolute',
        left: 50,
        top: 120,
        zIndex: -1,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#989898',
        shadowOffset: { width: 5, height: 5},
        shadowOpacity: 1,
        shadowRadius: 5,
    }

})

export default compose() (CircularProfilePhoto)
