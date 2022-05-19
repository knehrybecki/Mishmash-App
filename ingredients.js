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
    const ingredient = fetch('http://localhost:3001/api/ingredient', {
        method: 'POST',
        body: JSON.stringify({ ingredientName: inputText }),
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

            return null
        })

    return ingredient
}

const editIngredientsToBackEnd = (text, id) => {
    const ingredient = fetch('http://localhost:3001/api/ingredient', {
        method: 'PUT',
        body: JSON.stringify({
            ingredientUUID: id,
            ingredientName: text
        }),
        headers: { 'Content-type': 'application/json' },
    })
        .then(res => {
            if (res.ok) {
                return ingredient
            }

            throw error
        })
        .catch(error => {
            alert(error)

            return null
        })
}

const deleteIngredientsToBackEnd = deleteID => {
    const ingredient = fetch(`http://localhost:3001/api/ingredient?ingredientUUID=${deleteID}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (res.ok) {
                return ingredient
            }
            
            throw error
        })
        .catch(error => {
            alert(error)

            return null
        })
}

const createNewIngredientsItem = () => {
    const ingredient = sendIngredientsToBackEnd($('.input').val())
        .then(res => {
            if (res !== null ){
                const list = $('<li>', {
                    class: 'ingredients'
                }).append($('<p>', {
                    class: 'ingredients__list',
                    text: res.ingredientName,
                    'data-id': res.ingredientUUID
                }))
         
                return list
            }
            throw error
        })
        .catch(error => {
            alert(error)

            return null
        })

    return ingredient
}

export const addIngredients = () => {
    const inputText = $('.input')

    if (inputText.val() === '') {
        return
    }

    const newItem = createNewIngredientsItem()

    newItem
        .then(res => {
            if (res !== null) {
                $('.menu__recipes').removeClass('disable')

                $('.content--border').text('Składniki')

                res.appendTo($('.content__ingredients--list'))

                createItemControls(res)

                inputText.val(null)

                return
            }

            throw error
        })
        .catch(error => {
            alert('wpisz nazwe składnika')
        })
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
        const target = $(event.target)

        target
            .closest('li').hide(400)

        setTimeout(() => {
            target
                .closest('li')
                .remove()
        }, 400)

        const id = target
            .closest('li')
            .children('p')
            .attr('data-id')

        deleteIngredientsToBackEnd(id)
    })

    editButton.click(event => {
        const target = $(event.target)

        target
            .closest('li')
            .children('p')
            .attr('contentEditable', 'plaintext-only')

        target
            .closest('.ingredients-all-button')
            .hide()

        target
            .closest('li')
            .children('.ingredients__edit--ok')
            .show()
    })

    const createEditableText = event => {
        const target = $(event.target)

        const id = target
            .closest('li')
            .children('p')
            .attr('data-id')

        const text = target.closest('li').children('p').text()

        editIngredientsToBackEnd(text, id)

       target
            .closest('li')
            .children('p')
            .attr('contentEditable', false)

        target
            .closest('li')
            .children('.ingredients__edit--ok')
            .hide()

        target
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
