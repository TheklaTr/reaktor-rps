import '@testing-library/jest-dom/extend-expect'

import { Result, WinRatio } from './calculations'

import gamesData from '../../../data/games'
import { render } from '@testing-library/react'

describe('Win ratio', () => {
   test('Should be Ahti Virtanen with 20%', () => {
      const result = WinRatio(gamesData, 'Ahti Virtanen', gamesData.length)
      expect(result).toMatch(`20% (1 of 5)`)
   })
})

describe('Result', () => {
   test('Should be draw', () => {
      const result = Result(gamesData[1].playerA, gamesData[1].playerB)
      const component = render(result)

      expect(component.container).toHaveTextContent(`DRAW!!!`)
   })
   test("Should be the player B's name", () => {
      const result = Result(gamesData[0].playerA, gamesData[0].playerB)
      const component = render(result)

      expect(component.container).toHaveTextContent(gamesData[0].playerB.name)
   })
})
