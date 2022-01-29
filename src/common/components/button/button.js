import './styles.scss';

export function Button({kind = 'default', ...rest}) {
  const cls = `btn-${kind}`;

  return <button className={cls} {...rest}/>
}