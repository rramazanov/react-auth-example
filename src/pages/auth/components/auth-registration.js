import {useState} from 'react';

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

  const handleSubmit = () => {
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
    });
  }

  return (
    <>
      <div className="form">
        <label className="label">
          <div className="label-text">Username</div>
          <input onChange={e => handleChangeUsername(e.currentTarget.value)} value={usernameValue} type="text"/>
        </label>
        <label className="label">
          <div className="label-text">Password</div>
          <input onChange={e => handleChangePassword(e.currentTarget.value)} value={passwordValue} type="text"/>
        </label>
        <label className="label">
          <div className="label-text">Confirm Password</div>
          <input onChange={e => handleChangePasswordConfirm(e.currentTarget.value)} value={passwordConfirmValue}
                 type="text"/>
        </label>
        <Button kind="main" onClick={handleSubmit}>Registration</Button>
      </div>
      <div className="callout">
        <span>Already registered? </span>
        <span className="link" onClick={handleClick}>Sign in.</span>
      </div>
    </>
  )
}