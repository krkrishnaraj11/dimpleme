import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { questionbank } from './questionbank.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  questionbank
});

export default rootReducer;