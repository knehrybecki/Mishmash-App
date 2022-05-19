import $ from 'jquery'

export let selectedIngredients = []

export const createNodeMishmash = () => {
    $('<div>', {
        class: 'content__mishmashList'
    }).appendTo($('.content')).hide()

    $('<div>', {
        class: 'mishmashList'
    }).appendTo($('.content__mishmashList'))
}

const getMishmashToBackEnd = async selectedIngredients => {
    const recipe = await fetch('http://localhost:3001/api/mishmash', {
        method: 'POST',
        body: JSON.stringify({
            selected: selectedIngredients
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        if (res.ok) {
          return res.json()
        }
        
        throw error
      })
      .catch(error => {
        alert(error)
      })
  
    return recipe
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
        const target = $(event.target)

        if (target.hasClass('selected')) {
            target.removeClass('selected')

            const ingredientUUID = target.children().attr('data-id')

            selectedIngredients = selectedIngredients.filter(value => value !== ingredientUUID)

            if (selectedIngredients.length === 0) {
                $('.mishmashList__recipe').hide(300)

                setTimeout(() => {
                    $('.mishmashList__recipe').remove()
                }, 300)
            }

            return
        }

        target.addClass('selected')

        $('.ingredients.mishmash.selected').css('pointer-events', 'auto')

        selectedIngredients[selectedIngredients.length] = target.children().attr('data-id')

        createfiltrRecipes()
    })

    const createfiltrRecipes = () => {
        $('.mishmashList__recipe').remove()

        getMishmashToBackEnd(selectedIngredients).then(recipeNames => {
            const titleRecipe = $('<div>', {
                text: recipeNames,
                class: 'mishmashList__recipe'
            }).appendTo($('.mishmashList'))

            titleRecipe.hide()
            titleRecipe.show('slow')
        })
    }
}
