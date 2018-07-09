import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { Dimensions, Image, StyleSheet, View, FlatList } from 'react-native';
import {Container, Text} from "native-base";

const HomeCard = ({name, major, status}) => (
    <View style={[styles.card, { backgroundColor: 'tomato' }]}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{major}</Text>
        <Text style={styles.text}>{status}</Text>
    </View>
)

// class HomeCard extends React.Component {
//
//     static propTypes = {
//
//     }
//
//     state = {
//
//     }
//
//
//
//     render(){
//         const {} = this.state;
//         return (
//             <View style={[styles.card, { backgroundColor: 'tomato' }]}>
//                 <Text style={styles.text}>this.props.counter</Text>
//                 <Text style={styles.text}>Major</Text>
//                 <Text style={styles.text}>Status</Text>
//             </View>
//         )
//     }
//
// }

const styles = StyleSheet.create({
    card: {
        height: 250,
        width: 200,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default HomeCard;
