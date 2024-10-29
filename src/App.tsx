
import './App.css'
import { Provider } from 'react-redux'
import TodoList from './assets/TodoList'
import store from './store'
function App() {

  return (
    <>
    <Provider store={store}>
    <TodoList/>
    </Provider>
    </>
  )
}

export default App
