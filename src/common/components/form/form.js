import './styles.scss';

export function Form({children, ...rest}) {
  return <form className="form" {...rest}>{children}</form>
}