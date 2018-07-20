import DatabaseService from "../api/databaseService";
import React from "react";
import compose from "recompose/compose";
import {StyleSheet, TouchableHighlight} from "react-native";
import HomeCard from './HomeCard';

class RecentView extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        major: "",
        status: "",
        imgUrl: "",
    }

    componentDidMount = () =>{
        this.fetchData()
    }

    fetchData = () => {
        const db = new DatabaseService;
        db.getEmployeeInfo(this.props.uid).then((result) => {
            this.setState({
                firstName: result.firstName,
                lastName: result.lastName,
                major: result.major,
                status: result.status,
                imgUrl: result.imgUrl,
            });
        })
    }

    render() {
        const {
            firstName,
            lastName,
            major,
            status,
            imgUrl,
        } = this.state;
        const {
            uid,
            onPress
        } = this.props;
        return (
            <TouchableHighlight
                style={styles.button}
                onPress={() => onPress(uid)}
                underlayColor="#EAEAEA"
            >
                <HomeCard
                    imgUrl={imgUrl}
                    name={`${firstName} ${lastName}`}
                    major={major}
                    status={status} />
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 7,
    },
});

export default compose() (RecentView)