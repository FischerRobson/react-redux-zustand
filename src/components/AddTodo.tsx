import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

export function AddTodo() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    dispatch()
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <input type="text" name="" id="" placeholder="novo to-do" />
      <button type="submit">Adicionar</button>
    </form>
  )
}
