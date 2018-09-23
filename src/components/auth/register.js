import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submitRegister } from '../../actions/auth'
import { to } from '../../actions/navigation'
import { required, email, minLength6, lengthLessThan40, minLenght4 } from '../../validators/forms';
import { connectTo } from '../../utils/generic';
import { isValid} from '../../utils/forms'
import TextField from './text-field'
import AuthForm from './auth-form'

export default connectTo(
  state => ({
    enabledSubmit: isValid(state, 'register')
  }),
  { to, submitRegister },
  reduxForm({ form: 'register' })(
    ({
      handleSubmit,
      enabledSubmit,
      submitRegister,
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
          name="username"
          key="username"
          component={TextField}
          label="Username"
          type="text"
          validate={[required, minLenght4]}
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
          onSubmit={submitRegister}
          submitText='Register'
          onBottomTextClick={() => to('login')}
          bottomText="Already have an account? Login"
        />
      )
    }
  )
)