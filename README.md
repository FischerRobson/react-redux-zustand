# Redux

Gerenciamento de estado global, ao contrario do Context API que ‘e para compartilhamento de estados.

### Tipos de estado no React

- Local State (useState)
- Global State (Redux)
- Server State (React Query)

### Arquitetura flux

![flux](https://github.com/FischerRobson/react-redux-zustand/assets/61335036/aa205fd7-06eb-41e7-ac96-748a4f0d11ae)


### Utilizando Redux (instalar Redux Dev Tools)

```json
"dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1"
  },
```

### Criar um store

```tsx
import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Fazer cafe'],
  reducers: {},
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
})
```

Cada Slice ‘e um estado do store.

### Acessar o store:

```tsx
import { useSelector } from 'react-redux'

export function TodoList() {
  const store = useSelector((store) => store)

  return (
    <ul>
      <li>Fazer cafe</li>
    </ul>
  )
}
```

### Para corrigir problemas de tipagem, crie um selector tipado para usar no lugar do useSelector (no mesmo arquivo do store):

```tsx
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```
