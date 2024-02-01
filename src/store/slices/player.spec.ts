import { describe, it, expect } from 'vitest'
import { player as reducer, playerSlice, play, next, PlayerState } from './player'

const testState: PlayerState = {
  course: {
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  isLoading: false,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

describe(`${reducer.name}`, () => {
  it('Should be able to play', () => { 
    const state = reducer(testState, play({moduleIndex: 1, lessonIndex: 2}))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('Should be able to play next video automatically', () => {
    
    const state = reducer(testState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to next module automatically', () => {
    
    const state = reducer({...testState, currentLessonIndex: 1}, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('Should not be able to change module and lesson if current lesson and module are the last', () => {
    
    const state = reducer({...testState, currentModuleIndex: 1, currentLessonIndex: 1}, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})