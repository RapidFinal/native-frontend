import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import AppNavigator from "./routes";
import { YellowBox } from 'react-native';
import ContextProvider from './context/withContext'
import {Content, Spinner, Container, Root} from "native-base";
import {Authentication} from './api'
import _ from 'lodash'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {

    static propTypes = {

    };

    state = {
        authenticated: false,
        loading: true,
        currentUser: null,
        employer: {
            firstName: "",
            lastName: "",
            email: "",
            companyName:'',
            password: "",
        },
        employee: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            tags: [],
            degree: "",
        },
        statusId: "",
        selectedCategories:{},
        authProvider: null,
        emailVerified: null,
        photoURL: null
    };

    componentDidMount(){
        this.unsubscribe = Authentication.onAuthStateChanged((currentUser) => {

            if (currentUser != null){
                // console.log("CU", currentUser, this.extractCurrentUserData(currentUser))
                this.setState({
                    authenticated: true,
                    loading: false,
                    currentUser,
                    ...this.extractCurrentUserData(currentUser)
                }, () => console.log("LOGIN STATE: ",this.state))
            } else {
                console.log("currentUser null");
                this.setState({
                    authenticated: false,
                    loading: false,
                    currentUser: null,
                    authProvider: null,
                    emailVerified: null,
                    photoURL: null

                })

            }
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    extractCurrentUserData = (currentUser) => {
        return {
            authProvider: currentUser.providerData["0"].providerId,
            emailVerified: currentUser.emailVerified,
            photoURL: currentUser.photoURL
        }
    }

    updateState = (nextState, cb) => {
        console.log("nextState", nextState);
        this.setState({
            ..._.pick(nextState, Object.keys(this.state))
        }, () => {
            cb && cb();
            console.log("states", this.state)
        });
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
    <Root>
        <AppNavigator />
    </Root>
)

const AuthLoading = ({}) => (

        <Content>
            <Spinner color={"black"} />
        </Content>
);

const styles = StyleSheet.create({

});

export default compose() (App)