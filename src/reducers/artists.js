const INITIAL_STATE = { data: [] }

export default function(state = INITIAL_STATE, action)  {
  switch (action.type) {
    case 'LOAD_ARTISTS':
      return { ...state, data: action.payload }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
