import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Modal, Linking} from "react-native";
import { SocialIcon, Icon } from 'react-native-elements'
import TagsSection from '../components/TagsSection'
import DatabaseService from "../api/databaseService";

class ProjectDetail extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        tags: PropTypes.array,
        links: PropTypes.array,
        modalVisible: PropTypes.bool,
    };

    state = {
        modalVisible: false,
        tags: [],
        tagIds: [],
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        let db = new DatabaseService();
        this.setState({tagIds: this.props.tagIds});
        let listTags = [];
        this.state.tagIds.forEach(tag => {
            db.getTagName(tag).then((result) => {
                listTags.push(result);
            });
        });
        this.setState({tags: listTags});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    openWeb = (url) => () => {
        // console.error(url)
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    };

    toggleModal = () => {
        this.setState((prevState) => ({modalVisible: !prevState.modalVisible}))
    };

    render(){
        const {title, description, date, links} = this.props;
        const {modalVisible, tags} = this.state;
        return (
            <View>
                <TouchableOpacity
                    style={styles.MainContainer}
                    onPress={() => {this.setModalVisible(true)}}
                >
                    <Text style={styles.Title}>{title}</Text>
                    <Text style={styles.Description}>{description}</Text>
                    <Text style={styles.Date}>{date}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={this.toggleModal}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <TouchableHighlight
                                style={styles.closeBtn}
                                onPress={this.toggleModal}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableHighlight>
                            <View style={styles.allText}>
                                <Text style={styles.titleText}>{title}</Text>
                                <Text>{date}</Text>
                                <Text style={styles.descText}>{description}</Text>
                                <View style={styles.iconBox}>
                                    <AllLinks links={links} onPress={this.openWeb} component={TouchableHighlight} />
                                </View>
                            </View>
                            <TagsSection tags={tags}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const AllLinks = ({links, component, onPress}) => {

    return (
        links.map((prop,key) => {
            if (prop.type === 'website') {
                return (
                    <Icon
                        name={'web'}
                        type={'FontAwesome'}
                        component={component}
                        onPress={onPress(prop.links)}
                        raised
                        color={'white'}
                        containerStyle={{backgroundColor: '#1D7BCD'}}
                        size={28}
                        key={key}
                    />
                )
            }
            else if (prop.type === 'bitbucket') {
                return (
                    <SocialIcon
                        style={styles.iconLink}
                        component={component}
                        onPress={onPress(prop.links)}
                        button
                        light
                        type={prop.type}
                        key={key}
                    />
                )
            }
            else {
                return (
                    <SocialIcon
                        style={styles.iconLink}
                        component={component}
                        onPress={onPress(prop.links)}
                        button
                        type={prop.type}
                        key={key}
                    />
                )
            }
        })
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 15,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#15BBCF',
        backgroundColor: '#F3F3F3',
    },

    Title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    Description: {
        fontSize: 16
    },

    Date: {
        fontSize: 14,
        textAlign: 'right',
        marginTop: 5,
    },
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
    },
    iconBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconLink: {
        width: 60,
        height: 60,
    }
});

export default compose() (ProjectDetail)
