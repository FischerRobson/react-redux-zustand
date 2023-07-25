import { useAppSelector } from '../store'

export function TodoList() {
  const todos = useAppSelector((store) => store.todo)

  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo}>{todo}</li>
      })}
    </ul>
  )
}
