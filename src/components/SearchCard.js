import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';
// import TagInput from 'react-native-tag-input';

const StatusIcon = ({status}) => {
    let color = 'grey';
    if (status === 'looking for job') {
        color = 'green';
    } else if (status === 'looking for opportunity') {
        color = '#EF9B0F';
    } else {
        color = 'grey';
    }
    //console.log(status, color);
    return (
        <Icon name='circle' color={color} style={{fontSize: 12, color: `${color}`}}/>
    )
}

class SearchCard extends Component {

    static propTypes = {
        results: PropTypes.array.isRequired,
        onPress: PropTypes.func.isRequired
    };
    state = { };

    render() {
        const {} = this.state;
        const { results, onPress } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <Content style={styles.container}>
            { results.map( (i, d) =>
                <Card key={d}>
                    <CardItem button onPress={() => onPress(i.uid)}>
                        <Left>
                            <Thumbnail style={styles.thumbnail}
                                       source={ (i.imgUrl) ? {uri: i.imgUrl} : require('../static/placeholder.png')}/>
                            <Body>
                                <Text>{i.firstName} {i.lastName}</Text>
                                <Text note style={styles.statusText}>
                                      {i.status} <StatusIcon status={i.status}/>
                                </Text>
                                <Text note style={styles.majorText}>{i.major}</Text>
                                <Tags
                                    initialTags={(i.tags) ? i.tags : []}
                                    readonly={true}
                                    tagTextStyle={{fontSize: 11}}
                                    onTagPress={() => {return null;}}
                                />
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            )}
                </Content>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    thumbnail: {
        width: 105,
        height: 105,
        borderRadius: 105/2
    },
    statusText:{
        fontSize: 12,
        color: 'black'
    },
    majorText: {
        fontSize: 12
    },
    tagText: {
        fontSize: 11
    }
});

export default compose() (SearchCard);
