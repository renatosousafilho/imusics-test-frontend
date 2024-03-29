const INITIAL_STATE = { data: {}, isAuthenticated: false }

export default function(state = INITIAL_STATE, action)  {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, data: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
