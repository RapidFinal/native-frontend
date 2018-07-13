import React from 'react';
import {
    ListItem, Text
} from 'native-base'

const CategoryItem = ({children, ...rest}) => (
    <ListItem {...rest}>
        <Text>{children}</Text>
    </ListItem>
)

export default CategoryItem;