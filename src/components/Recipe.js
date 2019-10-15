import React from 'react';
import dummyData from '../assets/dummy/recipes.json'
import '../css/Recipe.css'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Recipe = (props) => {

    const id = props.match.params.recipeID
    const recipe = dummyData.recipes.find(recipe => recipe.recipeID === parseInt(id))
    console.log(recipe)
    return (
        <div className="recipe-background">
            <div className="recipe-container">
                <h2 className="title">{recipe.title}</h2>
                <h6 className="indent">by <a className="author" href="#action">{recipe.author}</a></h6>
                <img className="main-image"
                        src={"." + recipe.imageUrl} 
                        alt=""/>
                <h5 className="indent description">{'"'+recipe.instruction+'"'}</h5>
                <br/>        
                <h4 className="indent">Ingredients</h4>    
                <div>
                {recipe.ingredients.map(ingredient =>
                    <div key={ingredient} className="indent">{ingredient}</div>)}
                </div>  
                <br/>
                <h4 className="indent">Instructions</h4>          
                <div>
                    {recipe.direction.map(instruction => (
                        <div key={instruction.id} className="indent">
                            <h6 className="inline">{instruction.step}</h6>
                            {'. ' + instruction.text}
                        </div>
                        ))
                    }
                </div>    
            </div>
        </div>
    );
};

export default Recipe;

