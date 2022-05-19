import { v4 as uuidv4 } from 'uuid'
import $ from 'jquery'

export const createNodeIngredients = () => {
    const content = $('.content')

    $('.menu__recipes').addClass('disable')
    $('.menu__mishmash').addClass('disable')

    $('<div>', {
        class: 'content--border',
      }).prependTo(content)

    const inputDiv = $('<div>', { class: 'content__ingredients--input' })

    const input = $('<input>', {
        type: 'text',
        class: 'input',
        placeholder: 'Twoje Składnik...'
    })

    const buttonAdd = $('<button>', {
        class: 'ingredients__button'
    }).append($('<i>', {
        class: 'fa-regular fa-plus'
    }))

    const ingredientsList = $('<ul>', { class: 'content__ingredients--list' })

    inputDiv.appendTo(content).hide()
    input.appendTo(inputDiv)
    buttonAdd.appendTo(inputDiv)
    ingredientsList.appendTo(content).hide()
}

const sendIngredientsToBackEnd = inputText => {
    fetch('http://localhost:3001/api/ingredient', {
        method: 'POST',
        body: JSON.stringify({ingredientName: inputText}),
        headers: {
          "Content-Type": "application/json"
        }
    })
}

const editIngredientsToBackEnd = (text, id) => {
    fetch('http://localhost:3001/api/ingredient', {
        method: 'PUT',
        body: JSON.stringify({
        ingredientUUID: id,
        ingredientName: text
    }),
        headers: {
            'Content-type': 'application/json'
        },
    })
}

const deleteIngredientsToBackEnd = deleteID => {
    fetch(`http://localhost:3001/api/ingredient?ingredientUUID=${deleteID}`, {
        method: 'DELETE'
    })
}

const createNewIngredientsItem = getText => {
    sendIngredientsToBackEnd($('.input').val())

    const list = $('<li>', {
        class: 'ingredients'
    }).append($('<p>', {
        class: 'ingredients__list',
        text: getText,
        'data-id': uuidv4()
    }))

    return list
}

export const addIngredients = () => {
    const inputText = $('.input')

    if (inputText.val() === '') {
        return
    }

    $('.content--border').text('Składniki')

    $('.menu__recipes').removeClass('disable')

    const newItem = createNewIngredientsItem(inputText.val())

    newItem.appendTo($('.content__ingredients--list'))

    createItemControls(newItem)

    inputText.val(null)
}

export const createItemControls = newItem => {
    const allButton = $('<div>', { class: 'ingredients-all-button' })
        .appendTo(newItem)
    const editButton = $('<button>', { class: 'ingredients__item-edit' })
        .appendTo(allButton)
    const deleteButton = $('<button>', { class: 'ingredients__item-deleted' })
        .appendTo(allButton)

    $('<i>', { class: 'fa-solid fa-pen' })
        .appendTo(editButton)
    $('<i>', { class: 'fa-solid fa-trash' })
        .appendTo(deleteButton)

    $('<button>', { class: 'ingredients__edit--ok' })
        .append($('<i>', { class: 'fa-solid fa-check' }))
        .appendTo(newItem).hide()

    deleteButton.click(event => {
        $(event.target)
            .closest('li').hide(400)

        setTimeout(() => {
            $(event.target)
                .closest('li')
                .remove()
        }, 400)

        const id = $(event.target)
            .closest('li')
            .children('p')
            .attr('data-id')
    
       deleteIngredientsToBackEnd(id)
    })

    editButton.click(event => {
        $(event.target)
            .closest('li')
            .children('p')
            .attr('contentEditable', 'plaintext-only')

        $(event.target)
            .closest('.ingredients-all-button')
            .hide()

        $(event.target)
            .closest('li')
            .children('.ingredients__edit--ok')
            .show()
    })

    const createEditableText = event => {
        const id = $(event.target)
            .closest('li')
            .children('p')
            .attr('data-id')

        const text = $(event.target).closest('li').children('p').text()

        editIngredientsToBackEnd(text, id)

        $(event.target)
            .closest('li')
            .children('p')
            .attr('contentEditable', false)

        $(event.target)
            .closest('li')
            .children('.ingredients__edit--ok')
            .hide()

        $(event.target)
            .closest('li')
            .children('.ingredients-all-button')
            .show()
    }

    $('.list__text').keyup(event => {
        if (event.keyCode === 13) {
            createEditableText()
        }
    })

    $('.ingredients__edit--ok').click(createEditableText)
}

export const createIngredients = () => {
    $('.content--border').text('Dodaj składniki')

    $('.ingredients__button').click(addIngredients)

    $('.input').keyup(event => {
        if (event.keyCode === 13) {
            addIngredients()
        }
    })
}

