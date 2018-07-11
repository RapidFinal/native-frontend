import React from 'react'
import {withContext} from "../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import AccountManagement from './AccountManagement'
import {Signin} from "./signin"

class AccountWrapper extends React.Component {
    render(){
        const { authenticated } = this.props.context;
        if (authenticated){
            return <AccountManagement />
        } else {
            return <Signin />
        }
    }
}

export default hoistStatics(compose(withContext)) (AccountWrapper)