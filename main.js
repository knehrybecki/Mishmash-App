import './Style/style.sass'
import './Style/reset.css'
import {
  createNodeRecipes,
  addIngredientsInRecipe,
  deleteRecipe
} from './recipes'
import {
  createMishmash,
  createNodeMishmash
} from './mishmash'
import {
  createNodeIngredients,
  createIngredients,
  createItemControls
} from './ingredients'
import $ from 'jquery'

let arrayRecipes = []
let ingredientsArray = []

const getIngredientsToBackEnd = async () => {
  const ingredient = await fetch('http://localhost:3001/api/ingredient')
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      throw error
    })
    .catch(error => {
      alert(error)

      return null
    })

    return ingredient
}

const getRecipesToBackEnd = () => {
  const recipe = fetch('http://localhost:3001/api/recipes')
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw error
    })
    .catch(error => {
      alert(error)

      return null
    })

    return recipe
}

createNodeIngredients()
createNodeRecipes()
createNodeMishmash()

getRecipesToBackEnd().then(listRecipes => {
  arrayRecipes = arrayRecipes.concat(listRecipes)

  if (arrayRecipes.length > 0) {
    $('.menu__mishmash').removeClass('disable')
  }

  arrayRecipes.forEach(value => {
    const list = $('<li>', {
      class: 'list__recipeName',
      text: value.recipeName,
      'data-id': value.recipeUUID
    }).appendTo($('.list'))

    $('<p>', {
      class: 'list__ingredients',
      text: value.ingredients.map(value => value.ingredientName)
    }).appendTo(list)

    $('<input>', {
      type: 'button',
      class: 'list__delete',
      value: 'Usuń',
    }).appendTo(list)
  })

  $('.list__delete').click(deleteRecipe)
})

getIngredientsToBackEnd()
  .then(listIngredients => {
      ingredientsArray = ingredientsArray.concat(listIngredients)

      if (ingredientsArray.length > 0) {
        $('.menu__recipes').removeClass('disable')

        $('.content--border').text('Składniki')
      }

      ingredientsArray.forEach(value => {
        const list = $('<li>', {
          class: 'ingredients'
        }).append($('<p>', {
          class: 'ingredients__list',
          text: value.ingredientName,
          'data-id': value.ingredientUUID
        })).appendTo($('.content__ingredients--list'))

        createItemControls(list)
      })
  })


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
  $('.ingredients-all-button').hide()
  $('.content__ingredients--input').hide()
  $('.menu__mishmash').addClass('selected')

  $('.menu__ingredients').removeClass('selected')
  $('.menu__recipes').removeClass('selected')

  createMishmash()

  $('.content__mishmashList').show()
}

toogleIngredients()
$('.menu__ingredients').click(toogleIngredients)
$('.menu__recipes').click(toogleRecipes)
$('.menu__mishmash').click(toogleMishmash)
