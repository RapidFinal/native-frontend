import React from 'react';
import {
    Icon, Left,
    ListItem, Right, Text
} from 'native-base'
import {
    StyleSheet
} from 'react-native'

const CategoryItem = ({children, ...rest}) => (
    <ListItem {...rest} style={styles.listItem}>
        <Left>
            <Text>{children}</Text>
        </Left>
        <Right>
            <Icon name="arrow-forward" />
        </Right>
    </ListItem>
)


const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        marginLeft: 0,
        paddingLeft: 10,
        height: 75

    }
})

export default CategoryItem;