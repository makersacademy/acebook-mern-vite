export const NavButton = (props) => {
  return (
    <li className="nav-item">
      <a className="nav-link lightest-text-color" href="#">
        {props.linkName}
      </a>
    </li>
  );
};