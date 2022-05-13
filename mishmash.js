import $ from "jquery"
import { objectRecipes } from "./recipes"

export let selectedIngredients = []

export const createNodeMishmash = () => {
    $('<div>', {
        class: 'content__mishmashList'
      }).appendTo($('.content')).hide()
      
      $('<div>', {
        class: 'mishmashList'
      }).appendTo($('.content__mishmashList'))
}

export const createMishmash = () => {
    selectedIngredients = []

    $('.mishmashList__recipe').remove()

    $('.content--border').text('Kliknij Na Składniki Aby Znaleźć Przepis')

    $('.ingredients.recipes').off('click')

    $('.content__ingredients--list')
        .removeClass('recipes')
        .addClass('mishmash')

    $('.ingredients')
        .removeClass('recipes')
        .addClass('mishmash')

    $('.content--border').addClass('mishmash')

    $('.ingredients.mishmash').click(event => {
        if ($(event.target).hasClass('selected')) {

            $(event.target).removeClass('selected')

            const deleteIngredients = selectedIngredients.find(value => value === $(event.target).children().text())

            selectedIngredients.splice(deleteIngredients, 1)
            
            if (selectedIngredients.length === 0) {
                $('.mishmashList__recipe').hide(300)
        
                setTimeout(() => {
                    $('.mishmashList__recipe').remove()
                }, 300)
            }

            return
        }

        $(event.target).addClass('selected')

        $('.ingredients.mishmash.selected').css('pointer-events', 'auto')

        selectedIngredients[selectedIngredients.length] = $(event.target).children().text()

        createfiltrRecipes()
    })

    const createfiltrRecipes = () => {
        $('.mishmashList__recipe').remove()
     
        let filtrRecipe = objectRecipes.find(val => val.ingredients === selectedIngredients.toString())

        const ingredientsRecipe = $('<p>', {
            text: filtrRecipe.ingredients,
            class: 'recipe--ingredients'
        })

        const titleRecipe = $('<div>', {
            text: filtrRecipe.recipe,
            class: 'mishmashList__recipe'
        }).append(ingredientsRecipe).appendTo($('.mishmashList'))

        titleRecipe.hide()
        titleRecipe.show('slow')
    }
}


