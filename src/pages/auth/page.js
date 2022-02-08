import {useState} from 'react';

import {AuthLogin} from './components/auth-login';
import {AuthRegistration} from './components/auth-registration';

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
      {pathname === '/login' && <AuthLogin setError={setError}/>}
      {pathname === '/registration' && <AuthRegistration setError={setError}/>}
    </div>
  )
}


