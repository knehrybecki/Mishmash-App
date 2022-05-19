import { v4 as uuidv4 } from 'uuid'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let listIngredients = []
let listRecipes = []

app.route('/api/ingredient')
  .get((req, res) => {
    res.json(listIngredients)
  })
  .post((req, res) => {
    const uuid = uuidv4()
    const ingredientName = req.body.ingredientName
    
    if (ingredientName === '') {
      res.status(404).end()

      return
    }

    listIngredients = listIngredients.concat([{
      ingredientUUID: uuid,
      ingredientName: ingredientName
    }])

    res.json({
      ingredientUUID: uuid,
      ingredientName: ingredientName
    })
  })
  .put((req, res) => {
    const id = req.body.ingredientUUID
    const ingredientName = req.body.ingredientName

   const findIngredient =  listIngredients.find(value => value.ingredientUUID === id)

    if (!findIngredient) {
      res.status(404).end()
    }
    
    listIngredients.filter(value => value.ingredientUUID === id)
      .map(value => value.ingredientName = ingredientName)

    res.status(200).end()
  })
  .delete((req, res) => {
    const ingredientUUID = req.query.ingredientUUID

    if (listIngredients.findIndex(value => value.ingredientUUID === ingredientUUID) === -1) {
      res.status(404).end()
    }

    listIngredients = listIngredients.filter(value => value.ingredientUUID !== ingredientUUID)

    res.status(200).end()
  })

app.route('/api/recipes')
  .get((req, res) => {
    res.json(listRecipes)
  })
  .post((req, res) => {
    const uuid = uuidv4()
    const recipeName = req.body.recipeName

    if (recipeName === '') {
      res.status(404).end()

      return
    }

    listRecipes = listRecipes.concat([{
      recipeUUID: uuid,
      recipeName: recipeName,
      ingredients: req.body.ingredients,
    }])

    res.json({
      recipeUUID: uuid,
      recipeName: recipeName,
      ingredients: req.body.ingredients,
    })
  })
  .delete((req, res) => {
    const ingredient = listRecipes.find(value => value.recipeUUID === req.query.recipeUUID)

    if (!ingredient) {
        res.status(404).end()
    }

    listRecipes = listRecipes.filter(value => value.recipeUUID !== ingredient.recipeUUID)

    res.status(200).end()
  })

app.route('/api/mishmash')
  .post((req, res) => {
    const selectedIngredientUUIDs = req.body.selected

    const recipeNames = listRecipes
        .filter(recipe => selectedIngredientUUIDs
        .every(uuid => recipe.ingredients.some(ingredient => ingredient.ingredientUUID === uuid)))
        .map(recipe => recipe.recipeName)
        
    res.json(recipeNames)
  })

if (import.meta.env.PROD) {
  app.listen(3001)
}

export const viteNodeApp = app