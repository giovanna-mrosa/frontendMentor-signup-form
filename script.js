const fields = document.querySelectorAll('[required]')

function ValidateField(field) {
  function verifyErrors() {
    let foundError = false

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError
  }

  function customMessage(typeError) {
    const fieldName = document
      .querySelector('input')
      .getAttribute('placeholder')
    const messages = {
      text: {
        valueMissing: `${fieldName} cannot be empty`
      },
      password: {
        valueMissing: 'Password cannot be empty'
      },
      email: {
        valueMissing: 'Email Address cannot be empty',
        typeMismatch: 'Looks like this is not an email'
      }
    }
    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error')
    const iconError = field.parentNode.querySelector('input')

    if (message) {
      iconError.classList.add('icon-error')
      spanError.classList.add('active')
      spanError.innerHTML = message
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    }
  }

  return function () {
    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)

      field.style.borderColor = 'var(--red)'
      setCustomMessage(message)
    } else {
      setCustomMessage()
    }
  }
}

function customValidation(event) {
  const field = event.target
  const validation = ValidateField(field)

  validation()
}

for (field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault()

    customValidation(event)
  })
  field.addEventListener('blur', customValidation)
}

document.querySelector('form').addEventListener('submit', event => {
  console.log('enviar o formulário')

  event.preventDefault()
})
