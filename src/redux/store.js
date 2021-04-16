const { combineReducers, createStore } = require("redux");
const { searchReducer, search5DayReducer } = require("./reducers");

const rootReducer = combineReducers({
    search: searchReducer,
    search5Day: search5DayReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);

export default store;