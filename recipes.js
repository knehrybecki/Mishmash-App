import $ from "jquery"

export let arrayRecipes = []

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

        ingredientsAddedToRecipeArray[ingredientsAddedToRecipeArray.length] = $(event.target).text()

        $('<p>', {
            class: 'create--ingredients',
            text: `${$(event.target).text()}`,
        }).appendTo($('.recipe__create'))

        $('.list--button-add').click(addRecipeToList)
    })
}

const createlist = getInigredients => {
    const list = $('<li>', {
        class: 'list__recipeName',
        text: $('.list-input').val(),
    })

    getInigredients.appendTo(list)

    $('<input>', {
        type: 'button',
        class: 'list__delete',
        value: 'Usuń',
    }).appendTo(list)

    return list
}

export const addRecipeToList = event => {
    if ($('.list-input').val() === '') {
        return
    }

    const getInigredients = $(event.target).parent('div').children('p')

    arrayRecipes = arrayRecipes.concat([{
        recipe: $('.list-input').val(),
        ingredients: ingredientsAddedToRecipeArray.toString()
    }])

    const newRecipe = createlist(getInigredients)

    newRecipe.appendTo($('.list'))

    resetInputRecipe()

    $('.list__delete').click(deleteRecipe)

    if($('.menu__mishmash').hasClass('disable')) {
        $('.menu__mishmash').removeClass('disable')
    }
}

const resetInputRecipe = () => {
    $('.list-input').val('')
    $('.list--button-add').remove()
    $('.ingredients.recipes').removeClass('selected')

    $('.menu__mishmash').css('pointer-events', 'auto')
    $('.menu__ingredients').css('pointer-events', 'auto')

    ingredientsAddedToRecipeArray = []
}

export const deleteRecipe = event => {
     $(event.target).parent().children('p').remove()

    const nameRecipe = $(event.target).parent('li').text()

    arrayRecipes = arrayRecipes.filter(item => item.recipe !== nameRecipe)

    $(event.target).parent().remove()
}
