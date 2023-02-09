import UserBox from './components/UserBox';
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <UserBox />
    </Provider>
  );
}

