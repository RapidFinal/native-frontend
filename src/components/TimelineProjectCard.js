import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import Timeline from 'react-native-timeline-listview';

class TimelineProjectCard extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        const {projects} = this.props;
        return (
            <Timeline
                showTime={false}
                separator={true}
                data={projects}
            />
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (TimelineProjectCard)
