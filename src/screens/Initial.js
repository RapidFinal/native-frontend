import React from 'react';
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import hoistStatics from "recompose/hoistStatics";

class Initial extends React.Component {

    componentDidMount() {
        const { context: {authenticated} } = this.props;
        if (authenticated) this.props.navigation.navigate("MainEmployer");
        else this.props.navigation.navigate("Auth");
    }

    render(){
        return null;
    }

}

export default hoistStatics(compose(withContext)) (Initial)
