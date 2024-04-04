export const NavButton = (props) => {
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <li className="nav-item lightest-text-color">
      <div onClick={handleClick} className="d-flex flex-column align-items-center">
        <i className={`fa ${props.iconId} fs-4 pt-2 lightest-text-color`}></i>
        <span className="lightest-text-color pt-0">{props.linkName}</span>
      </div>
    </li>
  );
};
