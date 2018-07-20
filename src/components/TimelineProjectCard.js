import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import Timeline from 'react-native-timeline-listview';

class TimelineProjectCard extends React.Component {

    static propTypes = {

    }

    state = {
        data: [ {title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. '},
            {title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
            {title: 'Lunch', description: "Hello"},
            {title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. '},
            {title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)'}]
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
