import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import AccountManagement from './AccountManagement'
import {Signin} from "../signin/index"

const { context: {authenticated}, ...rest } = this.props;

class AccountWrapper extends React.Component {

    componentDidMount() {
        if (authenticated && this.props.navigation.state.routeName === "InitialAccountWrapper") this.props.navigation.navigate("MainEmployer");
    }

    render(){
        if (authenticated) {
            const AccountManageWrap = hoistStatics(compose(withContext))(AccountManagement)
            return <AccountManageWrap {...rest} />
        } else {
            const SigninWrap = hoistStatics(compose(withContext))(Signin)
            return <SigninWrap {...rest} />
        }
    }
}

export default hoistStatics(compose(withContext)) (AccountWrapper)