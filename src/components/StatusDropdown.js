import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Item, Picker, Text} from "native-base";
import DatabaseService from "../api/databaseService";

class StatusDropdown extends React.Component {

    static propTypes = {

    }

    state = {
        selectedStatus: undefined,
        allStatus: {}
    }

    componentDidMount() {
        this.getStatusFromDB()
    }

    getStatusFromDB = () => {
        DatabaseService.getAllStatus().
        then(
            statusFromDB => {
                this.setState({
                    allStatus: statusFromDB
                })
            }
        )
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
        const {selectedStatus, allStatus} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
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
                            Object.keys(allStatus).map((item, index)=>{
                                return <Picker.Item
                                    key={index}
                                    label={allStatus[item]}
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

export default compose() (StatusDropdown)
