import React from 'react'
import hoistStatics from "recompose/hoistStatics";
import compose from "recompose/compose";
import PropTypes from 'prop-types'
import {withContext} from "../context/withContext";

const AuthenticationWrapper = ({authenticated: AuthenticatedComponent, unauthenticated: UnauthenticatedComponent, context, ...rest}) => {
    if (context.authenticated !== null  && context.authenticated){
        // const AuthenticatedComponent = hoistStatics()(authenticated);
        return (
            <AuthenticatedComponent {...rest} />
        )
    } else {
        // const UnauthenticatedComponent = hoistStatics()(unauthenticated);
        return (
            <UnauthenticatedComponent {...rest} />
        )
    }
};


// AuthenticationWrapper.propTypes = {
//     authenticated: PropTypes.node.isRequired,
//     unauthenticated: PropTypes.node.isRequired
// };


export default hoistStatics(compose(withContext)) (AuthenticationWrapper)