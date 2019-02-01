export function userUpdated(data)  {
  return { type: 'UPDATE_USERS', payload: data }
}

export function artistsUpdated(data)  {
  return { type: 'UPDATE_ARTISTS', payload: data.artists }
}

export function logout()  {
  return { type: 'LOGOUT' }
}
