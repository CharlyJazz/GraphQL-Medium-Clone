const removeCurrentUser = () => {
  localStorage.removeItem('Authorization')
  localStorage.removeItem('IdUser')
  localStorage.removeItem('UsernameUser')
  localStorage.removeItem('PictureUser')
}

export default removeCurrentUser