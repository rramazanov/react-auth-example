import {useEffect, useState} from 'react';

import {Button} from '../../common/components/button';
import {history} from '../../common/routing';
import api from '../../common/http'

import './styles.scss';

const defaultUser = {
  username: null,
  role: 'ANONYMOUS'
}

export function Page() {
  const [user, setUser] = useState(defaultUser);

  const handleRedirectToLogin = () => {
    history.push('/login');
  }

  const handleLogout = () => {
    api.post('/logout');
    handleRedirectToLogin();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.get('/user').then(data => {
        const user = data.user;
        setUser({username: user.username, role: user.role});
      })
    } else {
      history.push('/login');
    }
  }, [])

  if (user?.role === 'ANONYMOUS') {
    return (
      <div className="profile">
        <div className="title-block">
          <div>You are not authorized</div>
          <Button onClick={handleRedirectToLogin}>Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile">
      <div className="title-block">
        <div>About client</div>
        <Button onClick={handleLogout}>Sign out</Button>
      </div>
      <div className="form">
        <div>Client: {user.username}</div>
        <div>Role: {user.role}</div>
      </div>
    </div>
  )
}