import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, View} from "react-native";
import {
    Button,
    Container,
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
import {CredentialAuthentication} from "../../api/authentication"
import hoistStatics from "recompose/hoistStatics";

class WorkExp extends React.Component {

    static propTypes = {
        experiences: PropTypes.array
    }

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employee)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    state = {
        experiences: [
            {
                title: "",
                desc: ""
            }
        ]
    }

    removeExperience = (idx) => {
        const experiences = this.state.experiences.slice();
        experiences.splice(idx, 1);
        this.setState({
            experiences: experiences
        })
    }

    handleExperienceChange = (idx, name) => (event) => {
        const experiences = this.state.experiences.slice();
        experiences[idx][name] = event.nativeEvent.text;
        this.setState({
            experiences: experiences
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
        const experiences = this.state.experiences.slice();

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

    submit = async () => {
        const experiences = this.state.experiences.slice();
        const {employee, statusId, selectedCategories} = this.props.context;
        const {navigation, setContext} = this.props;
        let exps = experiences.filter((exp) => {
            return exp.title !== "" && exp.desc !== ""
        });

        let workExps = null
        if (exps.length !== 0) {
            workExps = exps
        }

        const {email, password} = {
            email: employee.email,
            password: employee.password
        };

        try {
            const auth = await CredentialAuthentication.signup({email, password});
            // uid, firstName, lastName, desc, statusId, tags, categories, experiences, major
            const db = new DatabaseService;
            db.createEmployeeInfo(
                auth.user._user.uid,
                employee.firstName,
                employee.lastName,
                "",
                statusId,
                employee.tags,
                selectedCategories,
                workExps,
                employee.major,
            )
            setContext({employee: null});
            navigation.navigate("MainCandidate")
        }
        catch (error) {
            console.log(error)
        }
    }


    render(){
        const {experiences} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
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
        backgroundColor: "#15BBCF",
    },
    center: {
        alignSelf: "center",
    },
    submitButton: {
        marginVertical: 60,
        backgroundColor: "#15BBCF"
    },
    leftAlign: {
        alignSelf: "flex-end"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default hoistStatics(compose(withContext)) (WorkExp)
