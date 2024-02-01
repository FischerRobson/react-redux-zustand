import { create } from "zustand";
import { api } from "../lib/api";

type Course = { 
  modules: {
    id: number,
    title: string,
    lessons: {
      id: string,
      title: string,
      duration: string
    }[]
  }[]
} | null

type PlayerState = {
  course: Course
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
  play: (params: {moduleIndex: number, lessonIndex: number}) => void
  next: () => void
  load: () => Promise<void>
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,

    load: async () => {
      set({
        isLoading: true
      })

      const { data } = await api.get('/course')

      set({
        course: data, 
        isLoading: false
      })
    },

    play: ({moduleIndex, lessonIndex}) => {
      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex
        }) 
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    }
  }
})

export function useCurrentLesson() {
  return useStore(state => {
    const { currentLessonIndex, currentModuleIndex } = state
    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentModule, currentLesson }
  })
}