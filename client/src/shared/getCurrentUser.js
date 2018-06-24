const getCurrentUser = () => {
  /*
  * Get current user data
  * The picture image is optional
  */
  const token = localStorage.getItem('Authorization')
  const id = localStorage.getItem('IdUser')
  const username = localStorage.getItem('UsernameUser')
  const picture = localStorage.getItem('PictureUser')

  return token && id && username ? {
    token, id, username, picture
  } : false
}

export default getCurrentUser