import { NavLink } from "react-router-dom";

const DashboardNav = ({bookingsCount = 0, hotelsCount = 0}) => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink
          exact={true}
          className={`nav-link`}
          to="/dashboard"
          activeClassName='active'
        >
          <i className="fa fa-money"/> &nbsp;Your Bookings ({bookingsCount})
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          exact={true}
          className={`nav-link`}
          activeClassName='active'
          to="/dashboard/seller"
        >
          <i className="fa fa-hotel"/> &nbsp;Your Hotels ({hotelsCount})
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;
