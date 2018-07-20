import React from 'react'
import {StyleSheet} from 'react-native'
import {Container} from "native-base";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ({children, ...rest}) => (
    <Container {...rest} style={styles.container}>
        {children}
    </Container>
)

