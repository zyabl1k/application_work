import { withProviders } from './providers/index';
import { Routing } from '../pages/index';
import { Flowbite } from 'flowbite-react';
import { Provider } from 'react-redux';
import { store } from './store/index.js';

const App = () => {
  return (
    <Flowbite>
      <Provider store={store}>
        <Routing />
      </Provider>
    </Flowbite>
  );
};

export default withProviders(App);
