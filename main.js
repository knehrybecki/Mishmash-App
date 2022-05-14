import './Style/style.sass'
import './Style/reset.css'
import { createNodeRecipes, addIngredientsInRecipe } from './recipes'
import { createMishmash, createNodeMishmash } from './mishmash'
import { createNodeIngredients, createIngredients} from './ingredients'
import $ from 'jquery'

export const ingredientsArray = new Map()

createNodeIngredients()
createNodeRecipes()
createNodeMishmash()

export const toogleIngredients = () => {
  $('.menu__ingredients').addClass('selected')
  $('.menu__recipes').removeClass('selected')

  createIngredients()

  $('.content__recipes').hide()
  $('.content__mishmashList').hide()

  $('.content__ingredients--input').show()
  $('.ingredients-all-button').show()

  $('.content__ingredients--list')
    .removeClass('recipes')
    .removeClass('mishmash')
    .show()

  $('.ingredients')
    .off('click')
    .removeClass('recipes')
    .removeClass('mishmash')
    .removeClass('selected')

  $('.content--border').removeClass('mishmash')
  $('.menu__mishmash').removeClass('selected')
}

export const toogleRecipes = () => {
  $('.content__ingredients--input').hide()
  $('.ingredients-all-button').hide()
  $('.ingredients__edit--ok').hide()

  $('.menu__recipes').addClass('selected')

  $('.menu__ingredients').removeClass('selected')

  addIngredientsInRecipe()

  $('.content__mishmashList').hide()

  $('.content__recipes').show()

  $('.menu__mishmash').removeClass('selected')

  $('.ingredients.recipes')
    .removeClass('mishmash')
    .removeClass('selected')

  $('.content__ingredients--list')
    .removeClass('mishmash')
}

export const toogleMishmash = () => {
  $('.content__recipes').hide()
  $('.menu__mishmash').addClass('selected')

  $('.menu__ingredients').removeClass('selected')
  $('.menu__recipes').removeClass('selected')

  createMishmash()

  $('.content__mishmashList').show()
}

$('.menu__ingredients').click(toogleIngredients)
$('.menu__recipes').click(toogleRecipes)
$('.menu__mishmash').click(toogleMishmash)
