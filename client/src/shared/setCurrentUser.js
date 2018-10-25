const setCurrentUser = ({
  token, id, username, picture
}) => {
  localStorage.setItem('Authorization', token)
  localStorage.setItem('IdUser', id)
  localStorage.setItem('UsernameUser', username)
  localStorage.setItem('PictureUser', picture)
}

export default setCurrentUser