export const checkValidity = ( value, rules ) => {
  let isValid = true;
  let message = [];
  if ( !rules ) {
      return true;
  }

  if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
      isValid || message.push('The field are empty')
  }

  if ( rules.minLength ) {
      isValid = value.length >= rules.minLength && isValid
      isValid || message.push(`The min length is ${rules.minLength}`)
  }

  if ( rules.maxLength ) {
      isValid = value.length <= rules.maxLength && isValid
      isValid || message.push(`The max length is ${rules.maxLength}`)
  }

  if ( rules.isEmail ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test( value ) && isValid
      isValid || message.push(`Write a correct email`)
  }

  if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid
      isValid || message.push(`Write a correct number`)
  }

  return isValid ? isValid : [isValid, message.join('. ')];
}