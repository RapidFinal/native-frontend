import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import AccountManagement from './AccountManagement'
import {Signin} from "../signin/index"

class AccountWrapper extends React.Component {
    render(){
        const { context: {authenticated}, ...rest } = this.props;
        if (authenticated) {
            return <AccountManagement {...rest} />
        } else {
            return <Signin {...rest} />
        }
    }
}

export default hoistStatics(compose(withContext)) (AccountWrapper)