import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Item, Picker, Text} from "native-base";
import {withContext} from "../context/withContext";

const status = [
    "Looking for job",
    "Looking for opportunities",
    "Not looking"
]

class StatusDropdown extends React.Component {

    static propTypes = {

    }

    state = {
        selectedStatus: undefined
    }

    changeStatus = (status) => {
        if (status !== null) {
            this.setState({
                selectedStatus : status
            });
            this.props.func(status)
        }
    }

    render(){
        const {selectedStatus} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        const {hasError} = this.props;
        return (
            <View>
                <Item picker regular style={styles.view} error={hasError}>
                    <Picker mode="dropdown"
                            selectedValue={selectedStatus}
                            onValueChange={this.changeStatus}
                    >
                        <Picker.Item
                            label="Select Status..."
                            value={null}/>
                        {
                            status.map((item,index)=>{
                                return <Picker.Item
                                    key={index}
                                    label={item}
                                    value={item}
                                />;
                            })
                        }
                    </Picker>
                </Item>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'white'
    }
});

export default compose(withContext) (StatusDropdown)
