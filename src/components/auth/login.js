import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitLogin } from '../../actions/auth'
import { to } from '../../actions/navigation'
import { required, email, minLength6, lengthLessThan40 } from '../../validators/forms';
import { connectTo } from '../../utils/generic';
import { isValid} from '../../utils/forms'
import TextField from './text-field'
import AuthForm from './auth-form'

export default connectTo(
  state => ({
    enabledSubmit: isValid(state, 'login')
  }),
  { to, submitLogin },
  reduxForm({ form: 'login' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitLogin,
      to
    }) => {
      const fields = [
        <Field
          name="email"
          key="email"
          component={TextField}
          label="Email"
          type="text"
          validate={[required, email]}
        />,
        <Field
          name="password"
          key="password"
          component={TextField}
          label="Password"
          type="password"
          validate={[required, minLength6, lengthLessThan40]}
        />
      ]
      return (
        <AuthForm
          fields={fields}
          handleSubmit={handleSubmit}
          enabledSubmit={enabledSubmit}
          onSubmit={submitLogin}
          submitText='Login'
          onBottomTextClick={() => to('register')}
          bottomText="Don't have an account? Register"
        />
      )
    }
  )
)