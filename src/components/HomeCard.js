import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import {Text} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import compose from "recompose/compose";

const HomeCard = ({photo, name, major, status}) => (
    <View style={styles.card}>
        <Image style={styles.image} source = {require('../static/snoopy.jpg')} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{major}</Text>
        <Text style={styles.text}>{status}</Text>
    </View>
)

const styles = StyleSheet.create({
    card: {
        height: 220,
        width: 170,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        color: '#999999',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        marginBottom: 6,
        justifyContent: 'center',
    },
});

export default HomeCard;
