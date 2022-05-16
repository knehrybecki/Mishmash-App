import * as main from '../main'
import { createNodeIngredients } from '../ingredients'
import { createNodeMishmash } from '../mishmash'
import { createNodeRecipes } from '../recipes'
import $ from 'jquery'

describe('Mishmash', () => {
    beforeEach(() => {
        $(document.body).append(`
      <div class="main">
      <div class="main__menu">
        <div class="menu">
          <div class="menu__ingredients">Składniki</div>
          <div class="menu__recipes">Przepisy</div>
          <div class="menu__mishmash">Mishmash</div>
        </div>
      </div>
      <div class="main__content">
        <div class="content"></div>
      </div>
    </div>
      `)
        createNodeIngredients()
        createNodeRecipes()
        createNodeMishmash()
    })
    
    afterEach(() => {
        $(document.body).empty()
    })

    test('check DOM', () => {
        expect($('.menu__ingredients').hasClass('disable')).toBeFalsy()
        expect($('.menu__recipes').hasClass('disable')).toBeTruthy()
        expect($('.menu__mishmash').hasClass('disable')).toBeTruthy()

        expect($('.content').has('.content--border').length > 0).toBeTruthy()
        expect($('.content').has('.content__recipes').length > 0).toBeTruthy()
        expect($('.content').has('.content__ingredients--input').length > 0).toBeTruthy()
        expect($('.content').has('.content__ingredients--list').length > 0).toBeTruthy()
        expect($('.content').has('.content__mishmashList').length > 0).toBeTruthy()

        expect($('.content--border').text()).toBe('')

        expect($('.content__recipes').css('display')).toBe('none')
        expect($('.content__ingredients--input').css('display')).toBe('none')
        expect($('.content__ingredients--list').css('display')).toBe('none')
        expect($('.content__mishmashList').css('display')).toBe('none')
    })

    test('check DOM when click on the ingredients', () => {
        main.toogleIngredients()

        expect($('.menu__ingredients').hasClass('selected')).toBeTruthy()
        expect($('.menu__recipes').hasClass('selected')).toBeFalsy()

        expect($('.content__recipes').css('display')).toBe('none')
        expect($('.content__mishmashList').css('display')).toBe('none')

        expect($('.content__ingredients--input').css('display')).toBe('block')
        expect($('.content__ingredients--list').css('display')).toBe('block')

        expect($('.content__ingredients--list').hasClass('recipes')).toBeFalsy()
        expect($('.content__ingredients--list').hasClass('mishmash')).toBeFalsy()

        expect($('.ingredients-all-button').css('display')).not.toBe('none')

        expect($('.ingredients').click().hasClass('selected')).toBeFalsy()
        expect($('.ingredients').hasClass('recipes')).toBeFalsy()
        expect($('.ingredients').hasClass('mishmash')).toBeFalsy()
        expect($('.ingredients').hasClass('selected')).toBeFalsy()

        expect($('.content--border').hasClass('mishmash')).toBeFalsy()
        expect($('.menu__mishmash').hasClass('selected')).toBeFalsy()

        expect($('.content--border').text()).toBe('Dodaj składniki')
    })

    test('check DOM when click on the recipes', () => {
        main.toogleIngredients()

        const text = 'mleko'

        $('.input').val(text)

        expect($('.input').val()).toBe(text)

        $('.ingredients__button').click()

        main.toogleRecipes()

        expect($('.content__ingredients--input').css('display')).toBe('none')
        expect($('.ingredients-all-button').css('display')).toBe('none')
        expect($('.ingredients__edit--ok').css('display')).toBe('none')

        expect($('.menu__recipes').hasClass('selected')).toBeTruthy()
        expect($('.menu__ingredients').hasClass('selected')).toBeFalsy()

        expect($('.content__ingredients--list').hasClass('recipes')).toBeTruthy()
        expect($('.content__ingredients--list').hasClass('mishamash')).toBeFalsy()

        expect($('.ingredients').hasClass('recipes')).toBeTruthy()

        expect($('.content--border').text()).toBe('Wybierz Składniki i Dodaj Przepis')

        expect($('.content__mishmashList').css('display')).toBe('none')

        expect($('.content__recipes').css('display')).toBe('block')

        expect($('.menu__mishmash').hasClass('selected')).toBeFalsy()

        expect($('.ingredients.recipes').hasClass('mishmash')).toBeFalsy()
        expect($('.ingredients.recipes').hasClass('selected')).toBeFalsy()
    })

    test('check DOM when click on the mishmash', () => {
        main.toogleIngredients()

        const text = 'mleko'

        $('.input').val(text)

        expect($('.input').val()).toBe(text)

        $('.ingredients__button').click()

        main.toogleRecipes()

        const recipe = 'Przepis'

        $('.list-input').val(recipe)

        $('.ingredients.recipes').click()

        $('.list--button-add').click()

        main.toogleMishmash()

        expect($('.content__recipes').css('display')).toBe('none')

        expect($('.menu__mishmash').hasClass('selected')).toBeTruthy()

        expect($('.menu__ingredients').hasClass('selected')).toBeFalsy()
        expect($('.menu__recipes').hasClass('selected')).toBeFalsy()

        expect($('.mishmashList').has('.mishmashList__recipe').length > 0).toBeFalsy()

        expect($('.content--border').text()).toBe('Kliknij Na Składniki Aby Znaleźć Przepis')

        expect($('.content__ingredients--list').hasClass('recipes')).toBeFalsy()
        expect($('.content__ingredients--list').hasClass('mishmash')).toBeTruthy()

        expect($('.ingredients').hasClass('recipes')).toBeFalsy()
        expect($('.ingredients').hasClass('mishmash')).toBeTruthy()

        expect($('.content__mishmashList').css('display')).toBe('block')
    })
})