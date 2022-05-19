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

const sendRecipeToBackEnd = recipeName => {
    const sendRecipe = fetch('http://localhost:3001/api/recipes', {
        method: 'POST',
        body: JSON.stringify({
            recipeName: recipeName,
            ingredients: ingredientsAddedToRecipeArray
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .catch(error => {
            console.log(error)
        })

    return sendRecipe
}

const deleteRecipeToBackEnd = recipeID => {
    const deleteRecipe = fetch(`http://localhost:3001/api/recipes?recipeUUID=${recipeID}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                return deleteRecipe
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const addIngredientsInRecipe = () => {
    const input = $('.list-input')

    $('.content__ingredients--list').addClass('recipes')

    $('.ingredients').addClass('recipes')

    $('.content--border').text('Wybierz Składniki i Dodaj Przepis')

    input.on('input', event => {
        input.attr('value', $(event.target).val())
    })

    $('.ingredients.recipes').click(event => {
        const target = $(event.target)

        $('.list--button-add').remove()

        $('.menu__ingredients').css('pointer-events', 'none')
        $('.menu__mishmash').css('pointer-events', 'none')

        $('<button>', {
            class: 'list--button-add',
            text: 'Dodaj przepis'
        }).prependTo($('.recipe__create'))

        target.addClass('selected')

        ingredientsAddedToRecipeArray = ingredientsAddedToRecipeArray.concat([{
            ingredientUUID: target.children().attr('data-id'),
            ingredientName: $(event.target).children().text()
        }])

        $('<p>', {
            class: 'create--ingredients',
            text: target.text(),
            'data-id': target.children().attr('data-id')
        }).appendTo($('.recipe__create'))

        $('.list--button-add').click(addRecipeToList)
    })
}

const createlist = () => {
    const sendRecipe = sendRecipeToBackEnd($('.list-input').val())
        .then(res => {
            const list = $('<li>', {
                class: 'list__recipeName',
                text: res.recipeName,
                'data-id': res.recipeUUID,
            })

            $('<p>', {
                class: 'list__ingredients',
                text: res.ingredients.map(ingredient => ingredient.ingredientName),
                'data-id': res.ingredients.map(ingredient => ingredient.ingredientUUID),
            }).appendTo(list)

            $('<input>', {
                type: 'button',
                class: 'list__delete',
                value: 'Usuń',
            }).appendTo(list)

            return list
        })

    return sendRecipe
}

export const addRecipeToList = () => {
    if ($('.list-input').val() === '') {
        return
    }

    const newRecipe = createlist()

    newRecipe.then(res => {
        res.appendTo($('.list'))

        resetInputRecipe()
    })

    $('.list__delete').click(deleteRecipe)
}

const resetInputRecipe = () => {
    $('.list-input').val('')

    $('.list--button-add').remove()
    $('.create--ingredients').remove()

    $('.ingredients.recipes').removeClass('selected')

    $('.menu__mishmash')
        .css('pointer-events', 'auto')
        .removeClass('disable')

    $('.menu__ingredients').css('pointer-events', 'auto')

    ingredientsAddedToRecipeArray = []
}

export const deleteRecipe = event => {

    const recipeID = $(event.target).parent('li').attr('data-id')

    deleteRecipeToBackEnd(recipeID)

    $(event.target).parent().remove()
}
