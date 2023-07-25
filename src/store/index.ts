import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer cafe'],
  reducers: {
    add: (state, action) => {
      state.push(action.payload.newTodo)
    },
  },
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
