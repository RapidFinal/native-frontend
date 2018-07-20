import React from 'react';
import {Container, Content, List} from "native-base";
import CategoryItem from "./CategoryItem";
import IonIcons from "react-native-vector-icons/Ionicons"

class SubCategorySideMenu extends React.Component {

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Sub Categories',
        })
    };

    handleClicked = (categoryKey, subCategoryKey) => (e) => {
        this.props.navigation.navigate("SearchResult", {categoryQuery: {categoryId: categoryKey, subCategoryId: subCategoryKey}})
    }

    render(){
        const {categoryKey, subCategories} = this.props.navigation.state.params;
        return (
            <Container>
                <Content>
                    <List>
                        {
                            subCategories.map(({subCategoryId: key, subCategoryName: name}) => (
                                <CategoryItem
                                    key={key}
                                    onPress={this.handleClicked(categoryKey, key)}>
                                    {name}
                                </CategoryItem>
                            ))
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}

export default SubCategorySideMenu;