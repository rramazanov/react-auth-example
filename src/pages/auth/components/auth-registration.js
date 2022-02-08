import {useState} from 'react';

import {Form} from '../../../common/components/form';
import {Button} from '../../../common/components/button';
import {history} from '../../../common/routing';
import api from '../../../common/http';

import '../styles.scss';

export function AuthRegistration({setError}) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

  const handleClick = () => {
    history.push('/auth')
  }

  const handleChangeUsername = (value) => {
    setUsernameValue(value);
  }

  const handleChangePassword = (value) => {
    setPasswordValue(value);
  }

  const handleChangePasswordConfirm = (value) => {
    setPasswordConfirmValue(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordValue !== passwordConfirmValue) {
      setError('Password mismatch');
    } else {
      const body = {
        username: usernameValue,
        password: passwordValue
      }

      api.post('/registration', body).then(data => {
        const {success, message} = data;

        if (!success) {
          setError(message);
        } else {
          history.push('/profile');
        }
      }).catch(e => setError(e.message));
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label className="label">
          <div className="label-text">Username</div>
          <input
            onChange={e => handleChangeUsername(e.currentTarget.value)}
            value={usernameValue}
            required={true}
            type="text"
            minLength={3}
            maxLength={16}
          />
        </label>
        <label className="label">
          <div className="label-text">Password</div>
          <input
            onChange={e => handleChangePassword(e.currentTarget.value)}
            value={passwordValue}
            required={true}
            type="password"
            minLength={4}
            maxLength={21}
          />
        </label>
        <label className="label">
          <div className="label-text">Confirm Password</div>
          <input
            onChange={e => handleChangePasswordConfirm(e.currentTarget.value)}
            value={passwordConfirmValue}
            required={true}
            type="password"
            minLength={4}
            maxLength={21}
          />
        </label>
        <Button kind="main" type="submit">Registration</Button>
      </Form>
      <div className="callout">
        <span>Already registered? </span>
        <span className="link" onClick={handleClick}>Sign in.</span>
      </div>
    </>
  )
}