import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';
import TagInput from 'react-native-tag-input';

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
                                      {i.status} <Icon name='circle' color='green' style={{fontSize: 12, color: 'green'}}/>
                                </Text>
                                <Text note style={styles.majorText}>{i.major}</Text>
                                <TagInput
                                      value={(i.tags) ? i.tags : []}
                                      labelExtractor={ l => <Text style={styles.tagText}>{l}</Text> }
                                      editable={false}
                                      text={""}
                                      onChange={() => null}
                                      onChangeText={() => ""}
                                      inputProps={{placeholder: ""}}
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
