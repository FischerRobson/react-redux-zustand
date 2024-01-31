import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

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

export type PlayerState = {
  course: Course
  currentModuleIndex: number
  currentLessonIndex: number
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
} 

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload
    },
    play: (state, action: PayloadAction<{ moduleIndex: number, lessonIndex: number }>) => {
      state.currentModuleIndex = action.payload.moduleIndex
      state.currentLessonIndex = action.payload.lessonIndex
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }

      }

    }
  }
})

export const player = playerSlice.reducer
export const { play, next, start } = playerSlice.actions

export function useCurrentLesson() {
  return useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentModule, currentLesson }
  })
}