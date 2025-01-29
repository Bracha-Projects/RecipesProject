import './App.css'
import { RouterProvider } from 'react-router-dom';
import { Router } from './router';
import { Provider } from 'react-redux';
import store from './recipes/Store';

const App = () => {
    return (<>
        <Provider store={store}>
            <RouterProvider router={Router} />
        </Provider>
    </>)
}
export default App
