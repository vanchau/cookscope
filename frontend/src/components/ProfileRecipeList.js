import React from 'react'
import { Card } from 'react-bootstrap'
import { withRouter, useHistory } from 'react-router-dom'
import '../css/ProfileRecipeList.css'


const ProfileRecipeList = (props) => {
	const { recipes } = props
	let history = useHistory()
	
  return (
    <React.Fragment>
						{recipes.map(recipe => (
							<Card
								className="profile-recipe-list-card"
								key={recipe.id}
								onClick={() => history.push(`/recipe/${recipe.id}`)}
							>
								<Card.Body>
									<Card.Img
										className="profile-recipe-list-card-img"
										src={('.' + recipe.imageUrl)} />
									<Card.Title>{recipe.title}</Card.Title>
									<Card.Text>
										by <a className='card-author' href='#action' >{recipe.author}</a>
									</Card.Text>
								</Card.Body>
							</Card>
						))}
    </React.Fragment>
  )
}

export default withRouter(ProfileRecipeList)
