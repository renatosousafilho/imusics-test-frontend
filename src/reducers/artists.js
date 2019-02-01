const INITIAL_STATE = { data: [], loading: true }

export default function(state = INITIAL_STATE, action)  {
  switch (action.type) {
    case 'LOAD_ARTISTS':
      return { ...state, data: action.payload, loading: false }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
