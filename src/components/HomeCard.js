import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import {Text} from "native-base";
import CircularProfilePhoto from './CircularProfilePhoto';

const HomeCard = ({imgUrl, name, major, status}) => (
    <View style={styles.card}>
        <View style={styles.image}>
            <CircularProfilePhoto url={imgUrl} diameter={100}/>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{major}</Text>
        <Text style={styles.text}>{status}</Text>
    </View>
);

const styles = StyleSheet.create({
    card: {
        height: 220,
        width: 170,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        flexGrow: 1,
    },
    text: {
        fontSize: 15,
        color: '#999999',
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default HomeCard;