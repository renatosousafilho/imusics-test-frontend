export function userUpdated(data)  {
  return { type: 'LOGIN', payload: data }
}

export function artistsUpdated(data)  {
  return { type: 'LOAD_ARTISTS', payload: data.artists }
}

export function logout()  {
  return { type: 'LOGOUT' }
}
