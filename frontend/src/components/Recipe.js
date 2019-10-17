import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import dummyData from '../assets/dummy/recipes.json'
import '../css/Recipe.css'

const Recipe = (props) => {
    const id = props.match.params.recipeID
    const [recipe, setRecipe] = useState({ingredients: [], direction:[]})
    const baseUrl = '/api/recipes/'+id
    useEffect(() => {
        axios
          .get(baseUrl)
          .then(response => {
            console.log(response.data)
            setRecipe(response.data)
          })
      }, [id, baseUrl])
      
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
                    {recipe && recipe.direction.map(instruction => (
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

