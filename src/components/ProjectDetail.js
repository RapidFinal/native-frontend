import React, {Component} from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View} from 'react-native';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import TagsSection from './TagsSection'
import DatabaseService from "../api/databaseService";

class ProjectDetail extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.array,
        links: PropTypes.array,
        modalVisible: PropTypes.bool,
    }


    state = {
        name: '',
        description: '',
        date: '',
        tags: [],
        links: [],
        modalVisible: false,
    }

    componentWillMount() {
        this.setState(
            {
                name: this.props.name,
                description: this.props.description,
                date: this.props.date,
                tags: this.props.tags,
                links: this.props.links
            })
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        const {} = this.props;
        const {name, description, date, tags, links, modalVisible} = this.state;
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight
                                style={styles.closeBtn}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableHighlight>
                            <Text style={styles.titleText}>{name}</Text>
                            <Text>Description: {description}</Text>
                            <Text>Date: {date}</Text>
                            <TagsSection tags={tags}/>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    closeBtn: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginRight: 20,
    },
    closeText: {
        fontSize: 20,
        color: '#007AFF',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        marginLeft: 10,
        color: '#39DAF3',
    }

});

export default compose() (ProjectDetail)
