import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class View_Test extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        tabBarOnPress: () => {
            if(navigation.isFocused()){
                navigation.state.params.scrollToTop()
            }
            else {
                navigation.navigate('View')
            }
        }
    });

    componentDidMount(){
        this.props.navigation.setParams({
            scrollToTop: this.callScrollToTop.bind(this)
        })
    }

    callScrollToTop() {
        this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    }

    static propTypes = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <FlatList
                data={[{key: 'a'}]}
                renderItem={({item}) =>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ height: 1000, marginTop: 10 }} onPress={() => this.props.navigation.navigate('Auth')}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>}
                ref="listRef"
            />
        );
    }

}

const styles = StyleSheet.create({

});

export default compose() (View_Test)
