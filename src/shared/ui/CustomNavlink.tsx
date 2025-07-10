import { NavLink, useLocation } from 'react-router-dom';

type CustomNavLinkProps = {
  to: string;
  label: string;
};

const CustomNavLink = ({ to, label }: CustomNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`pb-1 border-b-2 ${
        isActive ? 'border-orange-500 font-medium' : 'border-transparent'
      }`}
    >
      {label}
    </NavLink>
  );
};

export default CustomNavLink;
