export function userUpdated(data)  {
  return { type: 'USER_UPDATED', payload: data }
}

export function artistsUpdated(data)  {
  return { type: 'ARTISTS_UPDATED', payload: data.artists }
}

export function logout()  {
  return { type: 'LOGOUT' }
}
