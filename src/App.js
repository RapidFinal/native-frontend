import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            null
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (App)
