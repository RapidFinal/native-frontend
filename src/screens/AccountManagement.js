import React from 'react'
import {withContext} from "../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import {Container} from "native-base";
import {FacebookAuthentication, CredentialAuthentication} from '../api/authentication'
import {
    ClickButton
} from '../components'

class AccountManagement extends React.Component {

    logout = () => {
        const {authProvider} = this.props.context;

        switch (authProvider){
            case "CREDENTIAL":
                CredentialAuthentication.signout();
                break;

            case "FACEBOOK":
                FacebookAuthentication.facebookLogout();
                break;
        }
    };

    render(){
        return (
            <Container>
                <ClickButton>Account Management</ClickButton>
                <ClickButton onPress={this.logout}>Logout</ClickButton>
            </Container>
        )
    }
}

export default hoistStatics(compose(withContext)) (AccountManagement)