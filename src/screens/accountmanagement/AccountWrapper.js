import React from 'react'
import {withContext} from "../../context/withContext";
import compose from "recompose/compose";
import hoistStatics from "recompose/hoistStatics";
import AccountManagement from './AccountManagement'
import {Signin} from "../signin/index"

class AccountWrapper extends React.Component {

    static navigationOptions = () => {
        return ({
            title: 'Account Management',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            //headerRight: () => <View></View>,, /* Will not center properly after pressing logout */
        })
    };

    render(){
        const { context: {authenticated}, ...rest } = this.props;
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