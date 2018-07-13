import React from 'react'
import {Button, Text} from 'native-base'

const ClickButton = ({onPress, children, ...rest}) => (
    <Button block {...rest} style={{marginTop: "2%", marginBottom: "2%"}} onPress={onPress}>
        <Text>{children}</Text>
    </Button>
);

export default ClickButton;