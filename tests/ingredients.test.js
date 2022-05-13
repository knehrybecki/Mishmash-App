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
    main.ingredientsArray.clear()
  })

  test('add ingredients to list', () => {
    main.ToogleIngredients()

    expect($('.menu__ingredients').hasClass('selected')).toBeTruthy()

    expect($('.content__recipes').css('display')).toBe('none')
    expect($('.content__mishmashList').css('display')).toBe('none')

    expect($('.content--border').text()).toBe('Dodaj składniki')

    expect($('.content__ingredients--input').css('display')).toBe('block')
    expect($('.content__ingredients--list').css('display')).toBe('block')

    const text = 'mleko'

    $('.input').val(text)

    expect($('.input').val()).toBe(text)  

    $('.ingredients__button').click()

    expect($('.content--border').text()).toBe('Składniki')

    expect($('.menu__recipes').hasClass('disable')).toBeFalsy()

    expect($('.ingredients').has('.ingredients__list').length > 0).toBeTruthy()
    expect($('.ingredients').has('.ingredients-all-button').length > 0).toBeTruthy()

    expect($('.ingredients__list').attr('data-id')).toBeTruthy()
    expect($('.ingredients__list').text()).toBe(text)

    expect($('.ingredients-all-button').has('.ingredients__item-edit').length > 0).toBeTruthy()
    expect($('.ingredients-all-button').has('.ingredients__item-deleted').length > 0).toBeTruthy()

    expect($('.ingredients__edit--ok').css('display')).toBe('none')

    expect($('.input').val()).toBe('')

    expect(main.ingredientsArray.size).toBe(1)

    const id = $('.ingredients__list').attr('data-id')

    expect(main.ingredientsArray.get(id)).toBe(text)
  })

  test('Edit Ingredients', () => {
    main.ToogleIngredients()

    const text = 'mleko'

    $('.input').val(text)

    $('.ingredients__button').click()

    expect($('.ingredients__list').text()).toBe(text)

    const id = $('.ingredients__list').attr('data-id')

    expect(main.ingredientsArray.get(id)).toBe(text)

    $('.ingredients__item-edit').click()

    expect($('.ingredients__list').attr('contenteditable')).toBe('plaintext-only')

    expect($('.ingredients-all-button').css('display')).toBe('none')

    expect($('.ingredients__edit--ok').css('display')).toBe('inline-block')

    const newText = 'mąka'

    $('.ingredients__list').text(newText)

    $('.ingredients__edit--ok').click()

    expect($('.ingredients__edit--ok').css('display')).toBe('none')

    expect($('.ingredients-all-button').css('display')).toBe('block')

    expect($('.ingredients__list').attr('contenteditable')).toBe('false')

    expect($('.ingredients__list').text()).toBe(newText)

    expect(main.ingredientsArray.get(id)).toBe(newText)
  })

  test('deleted ingredients', () => {
    main.ToogleIngredients()

    const text = 'mleko'

    $('.input').val(text)

    $('.ingredients__button').click()

    $('.ingredients__item-deleted').click()

    jest.runAllTimers()

    expect($('.content__ingredients--list').has('.ingredients').length === 0).toBeTruthy()

    expect(main.ingredientsArray.size).toBe(0)
  })
})
