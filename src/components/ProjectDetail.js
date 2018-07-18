import React, {Component} from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View} from 'react-native';
import { SocialIcon } from 'react-native-elements'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import TagsSection from './TagsSection'

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
                    visible={modalVisible}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight
                                style={styles.closeBtn}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableHighlight>
                            <View style={styles.allText}>
                                <Text style={styles.titleText}>{name}</Text>
                                <Text>{date}</Text>
                                <Text style={styles.descText}>{description}</Text>
                            </View>
                            <allLinks />
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

const allLinks = () => {
    this.state.links.map((prop, key) => {
        console.log(prop.type)
        return (
            <SocialIcon
                title={prop.type}
                button
                type={prop.type}
            />
        )
    })
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
    allText: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 40,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        color: '#30C2D9',
        marginBottom: 5,
    },
    descText: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 10,
    }

});

export default compose() (ProjectDetail)
