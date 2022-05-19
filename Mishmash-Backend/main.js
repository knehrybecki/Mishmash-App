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
    const name = req.body.ingredientName

    if (name === '') {
      res.statusCode = 404
      res.status(404).end()
    }

    listIngredients = listIngredients.concat([{
      ingredientUUID: uuid,
      ingredientName: req.body.ingredientName
    }])

    res.json({
      ingredientUUID: uuid,
      ingredientName: req.body.ingredientName
    })
  })

  .put((req, res) => {
    const id = req.body.ingredientUUID
    const name = req.body.ingredientName
    
    const rename = listIngredients.find(value => value.ingredientUUID === id)

    if (!rename) {
      res.statusCode = 404
      res.status(404).end()
    }

    rename.ingredientName = name

    res.status(200).end()
  })

  .delete((req, res) => {
    const dataID = req.query.ingredientUUID

    if (listIngredients.findIndex(value => value.ingredientUUID === dataID) === -1) {
      res.statusCode = 404
      res.status(404).end()
    }

    listIngredients = listIngredients.filter(value => value.ingredientUUID !== dataID)

    res.status(200).end()
  })

app.route('/api/recipes')

  .get((req, res) => {
    res.json(listRecipes)
  })

  .post((req, res) => {
    const uuid = uuidv4()

    listRecipes = listRecipes.concat([{
      recipeUUID: uuid,
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
    }])

    res.status(200).end()
  })


  .delete((req, res) => {
    const ingredient = listRecipes.find(value => value.recipeUUID === req.query.recipeUUID)

    if ( !ingredient) {
      res.statusCode = 404
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