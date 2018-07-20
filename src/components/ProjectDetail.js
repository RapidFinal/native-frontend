import React from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, WebView, Linking} from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements'
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
        modalVisible: false,
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    openWeb = (url) => () => {
        // console.error(url)
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    toggleModal = () => {
        this.setState((prevState) => ({modalVisible: !prevState.modalVisible}))
    }

    render(){
        const {modalVisible} = this.state;
        const {name, description, date, tags, links} = this.props;
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
                                onPress={this.toggleModal}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableHighlight>
                            <View style={styles.allText}>
                                <Text style={styles.titleText}>{name}</Text>
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

                <TouchableHighlight
                    onPress={this.setModalVisible(true)}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
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
                        onPress={onPress(prop.link)}
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
                        onPress={onPress(prop.link)}
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
                        onPress={onPress(prop.link)}
                        button
                        type={prop.type}
                        key={key}
                    />
                )
            }
        })
    )
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
