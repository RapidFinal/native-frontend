import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import AppNavigator from "./routes";
import { YellowBox } from 'react-native';
import ContextProvider from './context/withContext'
import {Content, Spinner, Container} from "native-base";
import {Authentication} from './api'
import _ from 'lodash'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {

    static propTypes = {

    };

    state = {
        authenticated: false,
        loading: true,
        currentUser: null
    };


    componentDidMount(){

        console.log("Subscribing to onAuthStateChanged");
        this.unsubscribe = Authentication.onAuthStateChanged((currentUser) => {
            if (!!currentUser){
                this.setState({
                   authenticated: true,
                   loading: false,
                   currentUser
                })
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                    currentUser: null
                })

            }
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    updateState = (nextState, cb) => {
        this.setState({
            ..._.pick(nextState, Object.keys(this.state))
        }, cb);
    };

    render(){
        const {loading} = this.state;
        return (
            <ContextProvider state={{context: this.state, setContext: this.updateState}}>
                <Container>
                    {
                        !loading ? <AuthLoaded /> : <AuthLoading />
                    }
                </Container>
            </ContextProvider>
        )
    }

}

const AuthLoaded = ({}) => (
    <AppNavigator />
)

const AuthLoading = ({}) => (

        <Content>
            <Spinner color={"black"} />
        </Content>
);

const styles = StyleSheet.create({

});

export default compose() (App)