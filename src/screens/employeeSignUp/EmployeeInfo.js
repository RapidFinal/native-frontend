import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {ScrollView, StyleSheet, View} from "react-native";
import {
    Button,
    Container, Content,
    H3,
    Text,
} from "native-base";
import {
    NextButton,
    SignUpForm,
    StatusDropdown,
    Stepper,
    TextInput,
    TextInputWithLabel
} from "../../components/";
import {withContext} from "../../context/withContext";
import DatabaseService from "../../api/databaseService";
import Tags from "react-native-tags";
import hoistStatics from "recompose/hoistStatics";

const MyAwesomeButton = ({onPress, children}) => (
    <Button
        small
        style={styles.button}
        onPress={onPress(children)}
    >
        <Text uppercase={false}>{"+ " + children}</Text>
    </Button>
)

const SuggestedTags = ({suggestedTags, func}) => (
    <Tags
        readonly
        initialTags={suggestedTags}
        onTagPress={(index, tagLabel, event) => func(tagLabel)}
        containerStyle={{justifyContent: "center"}}
        tagContainerStyle={{alignItems: 'center', height: 40}}
        tagTextStyle={{fontSize: 16}}
    />
)

class EmployeeInfo extends React.Component {

    static propTypes = {
        tags: PropTypes.array,
        major: PropTypes.string,
        error: PropTypes.object,
        suggestionTags: PropTypes.array,
        statusId: PropTypes.string
    };

    static navigationOptions = () => {
        return ({
            title: 'Sign up (Employee)',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    state = {
        tags: [
            "",
            "",
            ""
        ],
        major: "",
        statusId: "",
        error: {
            message: "Required",
            tags: [
                false,
                false,
                false
            ],
            major: false,
            statusId: false,
        },
        suggestionTags: [],
    };


    componentDidMount(){
        this.getData()
    }

    getData = () => {
        const {
            selectedCategories
        } = this.props.context
        if (selectedCategories === null) {
            return;
        }
        const k = Object.keys(selectedCategories);
        const dataPromises = k.map(val => DatabaseService.getSuggestedTagsFrom(val))

        Promise
            .all(dataPromises)
            .then((data) => [].concat.apply([], data))
            .then((d) => {
                const shuffle = function (array) {
                    let currentIndex = array.length, temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                };
                d = shuffle(d);
                let fiveTags = d.slice(0, 5);
                this.setState({suggestionTags:fiveTags})
            })
    }



    handleChange = (name) => (event) => {
        if (typeof name === "number") {
            const tags = this.state.tags.slice();
            tags[name] = event.nativeEvent.text;
            this.setState({tags})
        }
        else {
            this.setState({
                [name]: event.nativeEvent.text
            })
        }
    };

    validate = (errorField) => {
        const {tags, error} = this.state;

        if (typeof errorField === "number" && tags[errorField] === '') {
            error.tags[errorField] = true;
        }
        else if (this.state[errorField] === "") {
            error[errorField] = true;
        }
        else {
            if (typeof errorField === "number") {
                error.tags[errorField] = false
            }
            else {
                error[errorField] = false
            }
        }
        this.setState({error})
    };

    passAllFlags = () => {
        const {tags, major, statusId} = this.state;
        let flag = true;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === "") {
                this.validate(index);
                flag = false;
            }
        }
        if (major === "") {
            this.validate("major");
            flag = false
        }
        if (statusId === "") {
            this.validate("statusId");
            flag = false
        }
        return flag;
    };

    attemptSubmit = () => {
        const {tags, major, statusId} = this.state;
        const {navigation, setContext, context} = this.props;
        const employee = {...context.employee};

        if (this.passAllFlags()) {
            employee.tags = tags;
            employee.major = major;
            setContext({
                employee: employee,
                statusId: statusId
            });

            navigation.navigate("workExp")
        }
    }

    setStatusState = (statusId) => {
        const error = {...this.state.error};
        error.statusId = false;
        this.setState({
            statusId: statusId,
            error: error
        });
    };



    putTagInTextInput = (tag) => {
        const {error, tags} = this.state;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === tag) {
                break;
            }
            else if (tags[index] === '') {
                tags[index] = tag

                error.tags[index] = false;
                this.setState({tags,error});
                break;
            }
        }
    }

    render() {
        const {tags, major, error, suggestionTags} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Content>
                    <Stepper
                        currentPosition={2}
                        stepCount={4}
                    />
                    <ScrollView>
                        <SignUpForm>
                            <H3>Your top skills</H3>
                            <Text style={styles.text}>Suggestion of popular tags</Text>

                            <SuggestedTags suggestedTags={suggestionTags} func={this.putTagInTextInput}/>

                            {tags.map((tag, index) => (
                                <TextInput
                                    key={index}
                                    placeholder={`${index + 1}. Add ...`}
                                    value={tag}
                                    onChange={this.handleChange(index)}
                                    hasError={error.tags[index]}
                                    errorMessage={error.message}
                                    onBlur={() => this.validate(index)}
                                />
                            ))}

                            <View style={styles.marginVertical}>
                                <TextInputWithLabel
                                    label={"Major"}
                                    placeholder={"Major"}
                                    value={major}
                                    onChange={this.handleChange("major")}
                                    hasError={error.major}
                                    errorMessage={error.message}
                                    onBlur={() => this.validate("major")}
                                />
                            </View>
                            <Text>Status</Text>
                            <StatusDropdown func={this.setStatusState} hasError={error.statusId}/>
                            {error.statusId ? <Text style={styles.error}>{error.message}</Text> : null}
                            <NextButton
                                onPress={() => this.attemptSubmit()}
                            />
                        </SignUpForm>
                    </ScrollView>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        marginVertical: 10
    },
    marginVertical: {
        marginVertical: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: "wrap",
        marginBottom: 10
    },
    button: {
        justifyContent: 'center',
        width: '30%',
        margin: 5,
    },
    error: {
        color: "red",
        fontSize: 14,
    }
});

export default hoistStatics(compose(withContext)) (EmployeeInfo)
