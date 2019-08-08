import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer, autoRehydrate } from "redux-persist";
import createMigration from 'redux-persist-migrate'
import storage from "redux-persist/es/storage";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import candidateListReducer from "./reducers/candidateListReducer.js";

const rootReducer = {
  candidateListReducer: candidateListReducer
};

const Immutable = require("immutable");
const Serialize = require("remotedev-serialize");
const reduxPersist = require("redux-persist");

function immutableTransform(config) {
  config = config || {};

  const serializer = Serialize.immutable(Immutable, config.records);

  return reduxPersist.createTransform(
    serializer.stringify,
    serializer.parse,
    config
  );
}

const persistConfig = {
  transforms: [immutableTransform()],
  key: "root",
  storage,
  // blacklist: ['candidateListReducer']
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore
} = createOffline({
  ...offlineConfig,
  persist: false
});

const reducer = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, offlineEnhanceReducer(reducer));

export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    offlineEnhanceStore,
    applyMiddleware(thunkMiddleware, offlineMiddleware)
  )
);
export const persistor = persistStore(store);
