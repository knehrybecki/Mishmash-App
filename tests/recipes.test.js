import * as main from '../main'
import { createNodeIngredients } from '../ingredients'
import { createNodeMishmash } from '../mishmash'
import {
    createNodeRecipes,
    ingredientsAddedToRecipeArray,
    arrayRecipes
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
        main.ingredientsArray.clear()
        arrayRecipes.length = 0
    })

    test('adding recipe to list', () => {
        main.toogleIngredients()

        const text = 'mleko'

        $('.input').val(text)

        expect($('.input').val()).toBe(text)

        $('.ingredients__button').click()

        main.toogleRecipes()

        const recipeName = 'Przepis'

        $('.list-input').val(recipeName)

        expect($('.list-input').val()).toBe(recipeName)

        $('.ingredients.recipes').click()

        expect($('.menu__mishmash').css('pointer-events')).toBe('none')
        expect($('.menu__ingredients').css('pointer-events')).toBe('none')

        expect($('.ingredients.recipes').hasClass('selected')).toBeTruthy()

        expect($('.recipe__create').has('.create--ingredients').length > 0).toBeTruthy()

        expect($('.create--ingredients').text()).toBe($('.ingredients__list').text())

        expect(ingredientsAddedToRecipeArray.length).toBe(1)

        $('.list--button-add').click()

        expect(arrayRecipes.length).toBe(1)

        expect($('.list').has('.list__recipeName').length > 0).toBeTruthy()

        expect($('.list__recipeName').has('.create--ingredients').length > 0).toBeTruthy()

        expect($('.create--ingredients').text()).toBe($('.ingredients__list').text())

        expect($('.list__recipeName').has('.list__delete').length > 0).toBeTruthy()

        expect($('.menu__mishmash').hasClass('disable')).toBeFalsy()

        expect($('.list-input').val()).toBe('')

        expect($('.recipe__create').has('.list--button-add').length === 0).toBeTruthy()

        expect($('.ingredients.recipes').hasClass('selected')).toBeFalsy()

        expect($('.menu__mishmash').css('pointer-events')).toBe('auto')

        expect($('.menu__ingredients').css('pointer-events')).toBe('auto')

        expect(ingredientsAddedToRecipeArray.length).toBe(0)
    })

    test('deleted recipe', () => {
        main.toogleIngredients()

        const text = 'mleko'

        $('.input').val(text)

        $('.ingredients__button').click()

        main.toogleRecipes()

        const recipeName = 'Przepis'

        $('.list-input').val(recipeName)

        $('.ingredients.recipes').click()

        $('.list--button-add').click()

        expect($('.list').has('.list__delete').length > 0).toBeTruthy()

        $('.list__delete').click()

        expect($('.list').has('.list__recipeName').length === 0).toBeTruthy()

        expect(arrayRecipes.length).toBe(0)
    })
})
