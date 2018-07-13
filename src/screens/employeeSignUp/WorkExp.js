import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, View} from "react-native";
import {
    Button,
    Container,
    Content,
    H3,
    Icon,
    Toast,
    Text
} from "native-base";
import {
    PlusButton,
    SignUpForm,
    Stepper,
    TextInputWithLabel
} from "../../components";
import {withContext} from "../../context/withContext";
import DatabaseService from "../../api/databaseService";

class WorkExp extends React.Component {

    static propTypes = {

    }

    state = {
        experiences: [
            {
                title: "",
                desc: ""
            }
        ]
    }

    removeExperience = (idx) => {
        this.state.experiences.splice(idx, 1);
        this.setState({
            experiences: this.state.experiences
        })
    }

    handleExperienceChange = (idx, name) => (event) => {
        this.state.experiences[idx][name] = event.nativeEvent.text;
        this.setState({
            experiences: this.state.experiences
        })
    }

    renderCloseButton = (idx) => {
        if (this.state.experiences.length > 1) {
            return (
                <Button
                    style={[styles.leftAlign]}
                    transparent
                    onPress={() => this.removeExperience(idx)}
                >
                    <Icon name={"close"}/>
                </Button>
            )
        }
    }

    renderBox = (experience, idx) => (
        <View key={idx} style={styles.box}>
            {this.renderCloseButton(idx)}
            <TextInputWithLabel
                label="Title"
                placeholder="Title"
                value={experience.title}
                onChange={this.handleExperienceChange(idx, "title")}
            />
            <TextInputWithLabel
                label="Description"
                placeholder="Description"
                value={experience.desc}
                onChange={this.handleExperienceChange(idx, "desc")}
            />
        </View>
    );

    addMoreWorkExp = () => {
        const {experiences} = this.state;

        if (this.checkCanAdd()) {
            this.setState({
                experiences: experiences.concat({title: "", desc: ""})
            })
        }
        else {
            Toast.show({
                text: 'Please fill in all the information before adding new one!',
                buttonText: 'Okay'
            })
        }
    }

    checkCanAdd = () => {
        const {experiences} = this.state;

        for (let idx in experiences) {
            let exp = experiences[idx]
            if (exp.title === "" || exp.desc === "") {
                return false
            }
        }
        return true
    }

    submit = () => {
        const {experiences} = this.state
        const {employee, currentUser, statusId, selectedCategories} = this.props.context
        let exps = experiences.filter((exp) => {
            return exp.title !== "" && exp.desc !== ""
        })

        let workExps = null
        if (exps.length !== 0) {
            workExps = exps
        }
        console.log(
            currentUser,
            employee.firstName,
            employee.lastName,
            "",
            statusId,
            employee.tags,
            "NO_IMAGE",
            selectedCategories,
            workExps,
            employee.degree
        )

        //uid, firstName, lastName, desc, statusId, tags, imgUrl, categories, experiences, degree
        // DatabaseService.createEmployeeInfo(
        //     currentUser.uid,
        //     employee.firstName,
        //     employee.lastName,
        //     "",
        //     statusId,
        //     employee.tags,
        //     "",
        //     selectedCategories,
        //     workExps,
        //     employee.degree
        // )
        this.props.navigation.navigate("MainCandidate")
    }


    render(){
        const {experiences} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Content>
                    <Stepper
                        currentPosition={3}
                        stepCount={4}
                    />
                    <ScrollView>
                        <SignUpForm>
                            <H3>Work Experience (Optional)</H3>
                            {experiences.map((experience, idx) =>
                                this.renderBox(experience, idx)
                        )}
                        </SignUpForm>
                        <PlusButton
                            style={[styles.plusButton, styles.center]}
                            onPress={this.addMoreWorkExp}
                        />
                        <Button
                            style={[styles.submitButton, styles.center]}
                            onPress={this.submit}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </ScrollView>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    box: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
    },
    plusButton: {
        marginVertical: 30,
    },
    center: {
        alignSelf: "center",
    },
    submitButton: {
        marginVertical: 60,
    },
    leftAlign: {
        alignSelf: "flex-end"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default compose(withContext) (WorkExp)
