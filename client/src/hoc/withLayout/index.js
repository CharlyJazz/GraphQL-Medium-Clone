import React from 'react'
import { withRouter } from 'react-router-dom'
import Grid from 'material-ui/Grid/Grid'
import Header from '../../components/Navegation/Header/Header'

const withLayout = WrappedComponent=> {
  const Layout = () => (
    <React.Fragment>
        <Header/>
        <main style={{ paddingLeft: 20, paddingRight: 20 }}> 
          <Grid container spacing={0}>
            <WrappedComponent {...this.props} />
          </Grid>
        </main>
      </React.Fragment>
  )

  return withRouter(Layout)
}

export default withLayout