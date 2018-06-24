import React, { Component } from 'react'
import withLayout from '../hoc/withLayout'
import GenerateRoutes from '../components/GenerateRoutes'
import routes from './routes'

class Application extends Component {
  render() {
    return (
      <React.Fragment>
        <GenerateRoutes routes={routes}/>
      </React.Fragment>
    )
  }
}

export default withLayout(Application)