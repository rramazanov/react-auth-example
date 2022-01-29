import {Button} from '../../common/components/button';

import './styles.scss';

export function Page() {
  const redirectToBack = () => {
    window.history.back();
  }
  return (
    <div className="about">
      <div className="block">
        <div>About</div>
        <Button onClick={redirectToBack}>Back</Button>
      </div>
      <div className="form">
        <div>It simple app implement authorization/registration.</div>
        <div>All new registered users will have role USER.</div>
        <div>ADMIN can update role users.</div>
        <br/>
        <div>Data to entry as ADMIN:</div>
        <div>Username: admin</div>
        <div>Password: admin</div>
      </div>
    </div>
  )
}