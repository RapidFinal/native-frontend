import React, {Component} from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = React.createContext({});

export const withContext = function withContext(WrappedComponent){
    return class extends React.Component{
        render(){
            const {children, ...rest} = this.props
            return (
                <Consumer>
                    {
                        context => (
                            <WrappedComponent {...context} {...rest}>{children}</WrappedComponent>
                        )
                    }
                </Consumer>
            )

        }
    }
};

export const withProvider = ({ children, state: value }) => (
    <Provider value={value}>
        {children}
    </Provider>
);

withProvider.propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.shape({
        context: PropTypes.object.isRequired,
        setContext: PropTypes.func.isRequired,
    }).isRequired,
};

export default withProvider;