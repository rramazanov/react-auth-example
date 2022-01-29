import {useState} from 'react';

import {history} from '../../common/routing';
import api from '../../common/http'
import {Button} from '../../common/components/button';
import {ReactComponent as CloseIcon} from '../../assets/ic_close.svg';

import './styles.scss';

export function Page({history}) {
  const [error, setError] = useState(null);
  const pathname = history.location.pathname;

  const handleResetError = () => {
    setError(null)
  }

  return (
    <div className="login">
      <div className="title">Sign</div>
      {
        error && (
          <div className="error">
            <div>{error}</div>
            <CloseIcon onClick={handleResetError} className="icon"/>
          </div>
        )
      }
      {pathname === '/login' && <FormLogin setError={setError}/>}
      {pathname === '/registration' && <FormRegistration setError={setError}/>}
    </div>
  )
}

function FormLogin({setError}) {
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
    api.post('/login', body).then(data => {
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
          <input onChange={e => handleChangeUsername(e.currentTarget.value)} type="text"/>
        </label>
        <label className="label">
          <div className="label-text">Password</div>
          <input onChange={e => handleChangePassword(e.currentTarget.value)} type="text"/>
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

function FormRegistration({setError}) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

  const handleClick = () => {
    history.push('/login')
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