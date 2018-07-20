import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import Timeline from 'react-native-timeline-listview';
import {Text, View} from "native-base";
import ProjectCard from "./ProjectCard";

class TimelineProjectCard extends React.Component {

    static propTypes = {

    }

    state = {

    }

    renderDetail = (rowData, sectionID, rowID) => {
        return (
            <View style={{flex:1}}>
                <ProjectCard
                    title={rowData.name}
                    description={rowData.description}
                    date={rowData.date}
                    links={rowData.links}
                    tagIds={rowData.tagIds}
                    key={rowData.name}
                />
            </View>
        )
    }

    render(){
        const {projects} = this.props;
        return (
            <Timeline
                showTime={false}
                data={projects}
                renderDetail={this.renderDetail}
            />
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (TimelineProjectCard)
