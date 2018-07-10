import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {Image, StyleSheet} from "react-native";
import {Container, Content, List, ListItem, Text} from "native-base";

class SideMenu extends React.Component {

    static propTypes = {

    }

    state = {

    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Content>
                    <Image
                        source={{
                            uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
                        }}
                        style={{
                            height: 120,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Image
                            square
                            style={{ height: 80, width: 70 }}
                            source={{
                                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
                            }}
                        />
                    </Image>
                    <List>
                        <ListItem
                            button
                            onPress={() => alert("Dog")}>
                            <Text>Dog</Text>
                        </ListItem>
                        <ListItem
                            button
                            onPress={() => alert("Cat")}>
                            <Text>Cat</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (SideMenu)
