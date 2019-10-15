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
                        variant="top"
                        src={"." + recipe.imageUrl} 
                        alt=""/>
                <h5 className="indent">{'"'+recipe.instruction+'"'}</h5>
                <br/>        
                <h4 className="indent">Ingredients</h4>    
                <br/>    
                <ul className="indent">
                {recipe.ingredients.map(ingredient =><li key={ingredient} className="indent">{ingredient}</li>)}
                </ul>
                <br/>
                <h4 className="indent">Instructions</h4>          
                <br/>
                <ListGroup style={{marginLeft: '20px'}} >
                    {recipe.direction.map(instruction => (
                        <ListGroup.Item key={instruction.id}>{instruction.step+ '. ' +instruction.text}</ListGroup.Item>
                    ))
                    }
                </ListGroup>    
            </div>
        </div>
    );
};

export default Recipe;

