import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import './styles/global.css'
import { Player } from './pages/Player'

export function App() {
  return (
    // <ReduxProvider store={store}>
      <Player />
    // </ReduxProvider>
  )
}
