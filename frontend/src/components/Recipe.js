import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import dummyData from '../assets/dummy/recipes.json'
import { Card } from 'react-bootstrap';
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
        <React.Fragment>
            <div style={{height:'1em', background:'transparent'}}></div>
            <Card className='recipe-card'>
                <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                        by <a className="card-author" href="#action" >{recipe.author}</a>
                    </Card.Text>
                    <Card.Img className="recipe-card-img" src={"." + recipe.imageUrl} />
                    <Card.Text>{'"'+recipe.instruction+'"'}</Card.Text>
                    <Card.Title><br/>Ingredients<br/></Card.Title> 
                    {recipe.ingredients.map(ingredient =>
                        <Card.Text key={ingredient}>{ingredient}</Card.Text>)}
                    <Card.Title><br/>Instructions<br/></Card.Title>          
                    {recipe.direction.map(instruction => (
                        <Card.Text key={instruction.id}>
                            {instruction.step}{'. ' + instruction.text}<br/>
                        </Card.Text>  
                    ))}                         
                </Card.Body>
            </Card>  
        </React.Fragment>
    );
};

export default Recipe;
