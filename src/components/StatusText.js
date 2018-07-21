import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, Image, View, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const StatusIcon = ({status}) => {
    let color = 'grey';
    if (status === 'looking for job') {
        color = 'green';
    } else if (status === 'looking for opportunity') {
        color = '#EF9B0F';
    } else {
        color = 'grey';
    }
    //console.log(status, color);
    return (
        <Icon name='circle' color={color} style={{fontSize: 20, color: `${color}`}}/>
    )
}

class StatusText extends React.Component {

    static propTypes = {
        status: PropTypes.string,
    }

    statusPicker() {
        if (this.props.status === 'looking for job') {
            return (<Image source={require('../assets/images/green.png')} style={styles.StatusImg}/>)
        } else if (this.props.status === 'looking for opportunity') {
            return (<Image source={require('../assets/images/yellow.png')} style={styles.StatusImg}/>)
        } else {
            return (<Image source={require('../assets/images/grey.png')} style={styles.StatusImg}/>)
        }
    }

    render(){
        return (
            <View style={styles.StatusBox}>
                <Text style={styles.StatusText}>{this.props.status + " "}</Text>
                <StatusIcon status={this.props.status}/>
                {/* {this.statusPicker()} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    StatusBox: {
        marginTop: 15,
        maxWidth: 400,
        maxHeight: 50,
        borderWidth: 1,
        borderColor: '#CCC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },

    StatusText: {
        textAlign: 'center',
        fontSize: 20,
    },

    StatusImg: {
        marginLeft: 10,
        width: 20,
        height: 20,
    }
});

export default compose() (StatusText)
