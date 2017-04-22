import makeStore from './src/store';
import startServer from './src/server';
import {startPollingApp} from './actions/actions.js';
export const store = makeStore();
startServer(store);

store.dispatch(startPollingApp());
/*store.dispatch({
    type: 'LOAD_POLLS',
    data: require('./data1.json')
});*/