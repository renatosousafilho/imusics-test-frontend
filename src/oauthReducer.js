const INITIAL_STATE = { artists: [], user: {} }

export default function(state = INITIAL_STATE, action)  {
  switch (action.type) {
    case 'USER_UPDATED':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'ARTISTS_UPDATED':
      return { ...state, artists: action.payload }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
