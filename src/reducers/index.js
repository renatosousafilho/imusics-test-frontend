import { combineReducers } from 'redux'
import user from './user'
import artists from './artists'

export const reducers = combineReducers({
  user: user,
  artists: artists
})
