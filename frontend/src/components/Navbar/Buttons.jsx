export const NavButton = (props) => {
  return (
    <li className="nav-item">
      <i className="display-icon">
        {props.iconId}
      </i>
      <a className="nav-link lightest-text-color" href="#">
        {props.linkName}
      </a>
    </li>
  );
};
