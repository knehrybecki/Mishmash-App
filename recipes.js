import { v4 as uuidv4 } from 'uuid'
import $ from 'jquery'

export let ingredientsAddedToRecipeArray = []

export const createNodeRecipes = () => {
    const recipes = $('<div>', { class: 'content__recipes' }).hide()

    $('.content> div:nth-child(1)').after(recipes)

    recipes.append($('<div>', { class: 'recipes__list' }))

    const recipeCreate = $('<div>', { class: 'recipe__create' })
        .appendTo($('.content__recipes'))

    $('<input>', {
        type: 'text',
        placeholder: 'Wpisz Nazwę Przepisu',
        class: 'list-input'
    }).appendTo(recipeCreate)

    $('<ul>', {
        class: 'list'
    }).appendTo($('.recipes__list'))
}

const sendRecipeToBackEnd = async recipeName => {
   await fetch('http://localhost:3001/api/recipes', {
        method: 'POST',
        body: JSON.stringify({
            recipeName: recipeName,
            ingredients: ingredientsAddedToRecipeArray
        }),
        headers: {
          "Content-Type": "application/json"
        }
    })
}

const deleteRecipeToBackEnd = async recipeID => {
    await fetch(`http://localhost:3001/api/recipes?recipeUUID=${recipeID}`,{
        method: 'DELETE'
    })
}

export const addIngredientsInRecipe = () => {
    $('.content__ingredients--list').addClass('recipes')

    $('.ingredients').addClass('recipes')

    $('.content--border').text('Wybierz Składniki i Dodaj Przepis')

    $('.list-input').on('input', event => {
        $('.list-input').attr('value', $(event.target).val())
    })
  
    $('.ingredients.recipes').click(event => {
        $('.list--button-add').remove()

        $('.menu__ingredients').css('pointer-events', 'none')
        $('.menu__mishmash').css('pointer-events', 'none')

        $('<button>', {
            class: 'list--button-add',
            text: 'Dodaj przepis'
        }).prependTo($('.recipe__create'))

        $(event.target).addClass('selected')

       ingredientsAddedToRecipeArray =  ingredientsAddedToRecipeArray.concat([{
            ingredientUUID: $(event.target).children().attr('data-id'),
            ingredientName: $(event.target).children().text()
        }])
        
        $('<p>', {
            class: 'create--ingredients',
            text: `${$(event.target).text()}`,
            'data-id': $(event.target).children().attr('data-id')
        }).appendTo($('.recipe__create'))

        $('.list--button-add').click(addRecipeToList)
    })
}

const createlist = getInigredients => {
    const list = $('<li>', {
        class: 'list__recipeName',
        text: $('.list-input').val(),
        'data-id': uuidv4(),
    })

    getInigredients.appendTo(list)

    $('<input>', {
        type: 'button',
        class: 'list__delete',
        value: 'Usuń',
    }).appendTo(list)

    return list
}

export const addRecipeToList = async event => {
   const recipeName = $('.list-input').val()

    if (recipeName === '') {
        return
    }

    await sendRecipeToBackEnd(recipeName)

    const getInigredients = $(event.target).parent('div').children('p')

    const newRecipe = createlist(getInigredients)

    newRecipe.appendTo($('.list'))

    resetInputRecipe()

    $('.list__delete').click(deleteRecipe)
}

const resetInputRecipe = () => {
    $('.list-input').val('')
    $('.list--button-add').remove()
    $('.ingredients.recipes').removeClass('selected')

    $('.menu__mishmash')
        .css('pointer-events', 'auto')
        .removeClass('disable')

    $('.menu__ingredients').css('pointer-events', 'auto')

    ingredientsAddedToRecipeArray = []
}

export const deleteRecipe = async event => {

    const recipeID = $(event.target).parent('li').attr('data-id')

   await deleteRecipeToBackEnd(recipeID)

    $(event.target).parent().remove()
}
