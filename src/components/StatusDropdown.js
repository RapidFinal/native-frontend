import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View} from "react-native";
import {Item, Picker, Text} from "native-base";

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

    changeStatus = (status)=>{
        if (status !== null) {
            this.setState({
                selectedStatus : status
            });
        }
    }

    render(){
        const {} = this.state;
        return (
            <View>
                <Text>Status</Text>
                <Item picker regular>
                    <Picker mode="dropdown"
                            placeholder="Select your SIM"
                            selectedValue={this.state.selectedStatus}
                            onValueChange={this.changeStatus.bind(this)}
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

});

export default compose() (StatusDropdown)
