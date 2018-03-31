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
    exact: false,
    private: false
  },
  {
    path: '/post/:id',
    component: PostContainer,
    exact: false,
    private: false
  },
  {
    path: '/search',
    component: SearchContainer,
    exact: false,
    private: false
  },
  {
    path: '/profile/:name',
    component: ProfileContainer,
    exact: false,
    private: false
  },
  {
    path: '/topics',
    component: TopicsContainer,
    exact: false,
    private: false
  },
  {
    path: '/topics/:name',
    component: TopicsContainer,
    exact: false,
    private: false
  },
  {
    path: '/collections/',
    component: CollectionsContainer,
    exact: false,
    private: false
  },
  {
    path: '/collections/:id',
    component: CollectionsContainer,
    exact: false,
    private: false
  },
  {
    path: '/write/post',
    component: NewPostContainer,
    exact: false,
    private: false
  }
]

export default routes