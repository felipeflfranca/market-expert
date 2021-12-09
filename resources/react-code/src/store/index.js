import { createStore } from 'redux';
import index from './reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(index);
const persister = 'marketexpert';

export { store, persister };
