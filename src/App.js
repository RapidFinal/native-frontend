import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import EmployerSignup from './screens/EmployerSignup'
import {StyleSheet} from "react-native";

class App extends React.Component {

    static propTypes = {

    }

    render(){
        return (
            // null
            <EmployerSignup/>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (App)
