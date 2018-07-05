import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {FlatList, StyleSheet, Text, View} from "react-native";

class Like extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) =>
                    <View style={styles.horizontalProfileCard}>
                        <Text style={styles.profileContentPlaceHolder}>Profile Text</Text>
                    </View>}
            />
        );
    }

}

const styles = StyleSheet.create({
    horizontalProfileCard: {
        height: 150,
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        borderTopWidth: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileContentPlaceHolder: {
        width: '100%',
        textAlign: 'center'
    }
});

export default compose() (Like)
