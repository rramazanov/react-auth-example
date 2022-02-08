import {useState} from 'react';

import {Button} from '../../../common/components/button';
import {history} from '../../../common/routing';
import api from '../../../common/http';

import '../styles.scss';

export function AuthLogin({setError}) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleClick = () => {
    history.push('/registration');
  }

  const handleChangeUsername = (value) => {
    setUsernameValue(value);
  }

  const handleChangePassword = (value) => {
    setPasswordValue(value);
  }

  const handleSubmit = () => {
    const body = {
      username: usernameValue,
      password: passwordValue
    }
    api.post('/auth', body).then(data => {
      const {success, message} = data;

      if (!success) {
        setError(message)
      } else {
        history.push('/profile')
      }
    });
  }

  return (
    <>
      <div className="form">
        <label className="label">
          <div className="label-text">Username</div>
          <input
            onChange={e => handleChangeUsername(e.currentTarget.value)}
            type="text"
            required={true}
          />
        </label>
        <label className="label">
          <div className="label-text">Password</div>
          <input
            onChange={e => handleChangePassword(e.currentTarget.value)}
            type="text"
            required={true}
          />
        </label>
        <Button kind="main" onClick={handleSubmit}>Sign in</Button>
      </div>
      <div className="callout">
        <span>New to Website? </span>
        <span className="link" onClick={handleClick}>Create an account.</span>
      </div>
    </>
  )
}