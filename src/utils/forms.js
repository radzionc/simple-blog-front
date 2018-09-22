export const submitHandler = (onSubmit, enabledSubmit) => e => {
  e.preventDefault()
  if (enabledSubmit) onSubmit()
}

export const submitAsyncValidation = (
  handleSubmit,
  enabledSubmit,
  onSubmit
) => e => {
  e.preventDefault()
  enabledSubmit &&
    handleSubmit(
      values =>
        new Promise((resolve, reject) => onSubmit({ values, resolve, reject }))
    )(e)
}

export const isValid = (state, formName) => isFormValid(state.form[formName])

export const isFormValid = form => form && !form.syncErrors && !form.pristine
