import React from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = React.createContext({});

export const withContext = Component => props => (
    <Consumer>
        {
            context => <Component {...context} {...props} />
        }
    </Consumer>
);

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