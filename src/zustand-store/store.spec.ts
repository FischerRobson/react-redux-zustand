import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '.'

const course = {
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
}

const initalState = useStore.getInitialState()

describe(`${useStore}`, () => {

  beforeEach(() => {
    useStore.setState(initalState)
  })

  it('Should be able to play', () => { 
    const { play } = useStore.getState()

    play({moduleIndex: 1, lessonIndex: 2})

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })

  it('Should be able to play next video automatically', () => {
    useStore.setState({ course })
    const { next } = useStore.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  it('Should be able to jump to next module automatically', () => {
    
    useStore.setState({course, currentModuleIndex: 0, currentLessonIndex: 1})

    const { next } = useStore.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  it('Should not be able to change module and lesson if current lesson and module are the last', () => {
    
    useStore.setState({course, currentModuleIndex: 1, currentLessonIndex: 1})

    const { next } = useStore.getState()

    next()

    const { currentModuleIndex, currentLessonIndex } = useStore.getState()

    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })
})