import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/api";

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
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false
} 

export const loadCourse = createAsyncThunk('start', async () => {
  const res = await api.get('/course')
  return res.data
})

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
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
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })
  }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions

export function useCurrentLesson() {
  return useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentModule, currentLesson }
  })
}