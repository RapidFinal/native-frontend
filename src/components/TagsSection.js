import React from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Tags from 'react-native-tags';

class SearchResult extends React.Component {

    static propTypes = {
        tags: PropTypes.array
    }

    render(){
        // const {} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <View style={styles.MainContainer}>
                <Tags
                    initialTags={this.props.tags}
                    readonly={true}
                    tagTextStyle={{fontSize: 11}}
                    onTagPress={() => {return null;}}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default compose() (SearchResult)
