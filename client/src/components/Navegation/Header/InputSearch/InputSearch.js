import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import Downshift from 'downshift'


const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
]

const renderInput = (inputProps) => {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      {...other}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...InputProps,
      }}
    />
  )
}

const renderSuggestion = (params) => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = params
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem === suggestion.label

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

const getSuggestions = (inputValue) => {
  let count = 0

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5

    if (keep) {
      count += 1
    }

    return keep
  })
}

const styles = {
  container: {
    flexGrow: 1
  },
  paper: {
    position: 'absolute'
  }
}

function InputSearch(props) {
  const { classes } = props

  return (
    <Downshift>
      {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              placeholder: 'Search a Post, Collection, User or Tag',
              id: 'integration-downshift',
            }),
          })}
          {isOpen ? (
            <Paper square className={classes.paper}>
              {getSuggestions(inputValue).map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion.label }),
                  highlightedIndex,
                  selectedItem,
                }),
              )}
            </Paper>
          ) : null}
        </div>
      )}
    </Downshift>
  )
}

InputSearch.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InputSearch)