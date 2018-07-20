import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet, View, Modal, TouchableOpacity} from "react-native";
import {Item, Picker, Spinner, Icon} from "native-base";
import DatabaseService from "../api/databaseService";
import StatusText from './StatusText';
import SaveButton from './SaveButton';
import {Authentication} from '../api';

class EditableStatus extends React.Component {

    static propTypes = {
        status: PropTypes.string,
        update: PropTypes.func,
        selectedStatusId: PropTypes.string,
        allStatus: PropTypes.object,
        modalVisible: PropTypes.bool,
        ready: PropTypes.bool,
    }

    state = {
        selectedStatusId: "",
        allStatus: {},
        modalVisible: false,
        ready: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    closeModal() {
        this.setModalVisible(!this.state.modalVisible)
    }

    openModal() {
        this.getStatusFromDB()
        this.setModalVisible(!this.state.modalVisible)
    }

    getCurrentStatusId(allStatus, status) {
        Object.keys(allStatus).forEach((key) => {
            if (allStatus[key] === status) {
                this.setState({
                    selectedStatusId: key
                })
            }
        });
    }

    save() {
        this.saveToDB(this.state.selectedStatusId)
        this.props.update('status', this.state.allStatus[this.state.selectedStatusId])
        this.closeModal()
    }

    saveToDB(statusId) {
        let db = new DatabaseService
        let uid = Authentication.currentUser().uid
        db.updateEmployeeStatus(uid, this.state.selectedStatusId)
    }

    getStatusFromDB = () => {
        let db = new DatabaseService
        db.getAllStatus().then(
            statusFromDB => {
                this.getCurrentStatusId(statusFromDB, this.props.status)
                this.setState({
                    allStatus: statusFromDB,
                    ready: true
                })
            }
        )
    }

    changeStatus = (status) => {
        if (status !== null) {
            this.setState({
                selectedStatusId: status
            });
        }
    }

    render() {
        const {ready, allStatus, selectedStatusId, modalVisible} = this.state;
        return (
            <View style={styles.RowAlign}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    {
                        ready ? (
                            <View style={[styles.MainContainer]}>
                                <TouchableOpacity
                                    style={styles.CloseIconPos}
                                    onPress={() => {
                                        this.closeModal();
                                    }}
                                >
                                    <Icon name='close'/>
                                </TouchableOpacity>
                                <Item>
                                    <Picker mode="dropdown"
                                            selectedValue={selectedStatusId}
                                            onValueChange={this.changeStatus}
                                    >
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
                                <SaveButton onPress={this.save.bind(this)}/>
                            </View>
                        ) : (
                            <DataLoading/>
                        )
                    }

                </Modal>

                <View style={[{maxWidth: '80%'}, styles.RowAlign]}>
                    <StatusText status={this.props.status}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.openModal();
                        }}
                    >
                        <Icon
                            type="FontAwesome"
                            name='edit'
                            style={[styles.EditIcon, styles.EditIconPosition]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const DataLoading = ({}) => (
    <View style={styles.MainContainer}>
        <Spinner color={"black"}/>
    </View>
);

const styles = StyleSheet.create({
    MainContainer: {
        width: '90%',
        maxWidth: '90%',
        marginTop: 20,
        alignSelf: 'center'
    },

    RowAlign: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    view: {
        backgroundColor: 'white'
    },

    EditIconPosition: {
        marginLeft: 10,
        marginTop: 15,
    },

    EditIcon: {
        fontSize: 25,
    },

    CloseIconPos: {
        alignSelf: 'flex-end'
    }
});

export default compose()(EditableStatus)
