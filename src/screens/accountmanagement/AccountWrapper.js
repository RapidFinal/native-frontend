import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import AccountManagement from './AccountManagement'
import AuthenticationWrapper from '../../components/AuthenticatedWrapper'
import {Signin} from "../signin/index"

class AccountWrapper extends React.Component {

    static navigationOptions = () => {
        return ({
            title: 'Account Management',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
        })
    };

    render() {
        return (
            <AuthenticationWrapper authenticated={AccountManagement} unauthenticated={Signin} />
        )
    }
}

export default hoistStatics(compose(withContext)) (AccountWrapper)