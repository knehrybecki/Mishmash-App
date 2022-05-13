import * as main from '../main'
import { createNodeIngredients } from '../ingredients'
import { createNodeMishmash, selectedIngredients } from '../mishmash'
import {
    createNodeRecipes,
    objectRecipes
} from '../recipes'
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
        objectRecipes.length = 0
    })

    test('find recipe', () => {
        main.ToogleIngredients()

        const text = 'mleko'

        $('.input').val(text)

        $('.ingredients__button').click()

        main.toogleRecipes()

        const recipeName = 'Przepis'

        $('.list-input').val(recipeName)

        $('.ingredients.recipes').click()

        $('.list--button-add').click()

        main.toogleMishmash()

        expect($('.mishmashList').has('.mishmashList__recipe').length === 0).toBeTruthy()

        expect($('.content--border').text()).toBe('Kliknij Na Składniki Aby Znaleźć Przepis')

        expect($('.content__ingredients--list').hasClass('recipes')).toBeFalsy()
        expect($('.content__ingredients--list').hasClass('mishmash')).toBeTruthy()

        expect($('.ingredients').hasClass('recipes')).toBeFalsy()
        expect($('.ingredients').hasClass('mishmash')).toBeTruthy()

        expect($('.content--border').hasClass('mishmash')).toBeTruthy()

        $('.ingredients.mishmash').click()

        expect($('.mishmashList').has('.mishmashList__recipe').length > 0).toBeTruthy()

        expect($('.ingredients.mishmash.selected').css('pointer-events')).toBe('auto')

        expect(selectedIngredients.length).toBe(1)

        expect($('.mishmashList').has('.mishmashList__recipe').length > 0).toBeTruthy()
        expect($('.mishmashList__recipe').has('.recipe--ingredients').length > 0).toBeTruthy()

        expect($('.recipe--ingredients').text()).toBe($('.ingredients.mishmash').text())

        expect($('.ingredients').hasClass('recipes')).toBeFalsy()
    })
})
