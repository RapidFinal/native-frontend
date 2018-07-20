import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import Timeline from 'react-native-timeline-listview';
import {View} from "native-base";
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
        const colorTheme = "#15BBCF";

        return (
            <View style={styles.MainContainer}>
                <Timeline
                    circleSize={20}
                    showTime={false}
                    data={projects}
                    circleColor={colorTheme}
                    lineColor={colorTheme}
                    renderDetail={this.renderDetail}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 10,
    }
});

export default compose() (TimelineProjectCard)
