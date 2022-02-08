import {useState} from 'react';

import {Form} from '../../../common/components/form';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: usernameValue,
      password: passwordValue
    }
    api.post('/login', body).then(data => {
      const {success, message} = data;
      console.log(success)
      if (!success) {
        setError(message)
      } else {
        history.push('/profile')
      }
    }).catch(e => setError(e.message));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label className="label">
          <div className="label-text">Username</div>
          <input
            onChange={e => handleChangeUsername(e.currentTarget.value)}
            type="text"
            required={true}
            minLength={3}
            maxLength={16}
          />
        </label>
        <label className="label">
          <div className="label-text">Password</div>
          <input
            onChange={e => handleChangePassword(e.currentTarget.value)}
            type="text"
            required={true}
            minLength={4}
            maxLength={21}
          />
        </label>
        <Button kind="main" type="submit">Sign in</Button>
      </Form>
      <div className="callout">
        <span>New to Website? </span>
        <span className="link" onClick={handleClick}>Create an account.</span>
      </div>
    </>
  )
}