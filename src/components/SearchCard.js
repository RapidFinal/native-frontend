import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import Tags from 'react-native-tags';

class SearchCard extends Component {

    static propTypes = {
        results: PropTypes.array.isRequired
    };
    state = { };

    // componentDidUpdate(prevProps) {
    //     if (this.props.results === prevProps.results)
	  //         return true;
    // }

    render() {
        const {} = this.state;
        const { results } = this.props;
        //console.log("SearchCard Results:", results);

        // Use a LIST???

        return (
            <SafeAreaView style={{
                flex: 1,
                // flexDirection: 'column',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
                // flexWrap: 'wrap'
            }}>
                <Content style={{flex: 1}}>
            { results.map( (i, d) =>
                <Card key={d}>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail style={{width: 105, height: 105, borderRadius: 105/2}}
                                       source={{uri: i.imgUrl}}/>
                            <Body>
                                <Text>{i.firstName} {i.lastName}</Text>
                                <Text note style={{fontSize: 12, color: "black"}}>{i.status} <Icon name='circle' color='green' style={{fontSize: 12, color: 'green'}}/></Text>
                                <Text note style={{fontSize: 12}}>{i.major}</Text>
                                <Tags
                                    initialTags={["java", "css"]}
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
        )
    }
}

const styles = StyleSheet.create({

});

export default compose() (SearchCard)
