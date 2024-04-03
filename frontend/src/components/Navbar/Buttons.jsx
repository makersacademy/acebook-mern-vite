export const NavButton = (props) => {
  return (
    <li className="nav-item lightest-text-color">
      <i className={`fas ${props.iconId} fs-4 pt-2`}></i>
      <a className="nav-link lightest-text-color pt-0" href="#">
        {props.linkName}
      </a>
    </li>
  );
};
