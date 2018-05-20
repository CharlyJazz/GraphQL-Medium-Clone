const stylesBase = theme => ({
  container: {
    boxShadow: 'none !important'
  },
  boxMarginTop: {
    marginTop: 20
  },
  formControl: {
    width: '100%',
    marginBottom: 12
  },
  swithFormButton: {
    marginTop: 10
  },
  cardContent: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down(920)]: {
      width: '70%'
    }
  },
  icon: {
    verticalAlign: 'middle',
    fill: '#009688'
  }
});

export default stylesBase;