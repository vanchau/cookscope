import React from 'react';
import dummyData from '../assets/dummy/recipes.json'

const Recipe = (props) => {
    const id = props.match.params.recipeID
    const recipe = dummyData.recipes.filter(recipe => recipe.recipeID === parseInt(id))
    return (
        <div style={{backgroundColor: "white"}}>
            hello
        </div>
    );
};

export default Recipe;