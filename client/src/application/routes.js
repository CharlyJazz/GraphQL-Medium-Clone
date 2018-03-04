import HomeContainer from '../containers/HomeContainer'
import AuthContainer from '../containers/AuthContainer'
import PostContainer from '../containers/PostContainer'
import SearchContainer from '../containers/SearchContainer'
import ProfileContainer from '../containers/ProfileContainer'
import CollectionsContainer from '../containers/CollectionsContainer'
import TopicsContainer from '../containers/TopicsContainer'
import NewPostContainer from '../containers/NewPostContainer'

const routes = [
  {
    path: '/',
    component: HomeContainer,
    exact: true,
    private: false
  },
  {
    path: '/auth',
    component: AuthContainer,
    exact: true,
    private: false
  },
  {
    path: '/post/:id',
    component: PostContainer,
    exact: true,
    private: false
  },
  {
    path: '/search',
    component: SearchContainer,
    exact: true,
    private: false
  },
  {
    path: '/profile/:name',
    component: ProfileContainer,
    exact: true,
    private: false
  },
  {
    path: '/topics',
    component: TopicsContainer,
    exact: true,
    private: false
  },
  {
    path: '/topics/:name',
    component: TopicsContainer,
    exact: true,
    private: false
  },
  {
    path: '/collections/',
    component: CollectionsContainer,
    exact: true,
    private: false
  },
  {
    path: '/collections/:id',
    component: CollectionsContainer,
    exact: true,
    private: false
  },
  {
    path: '/write/post',
    component: NewPostContainer,
    exact: true,
    private: false
  }
]

export default routes