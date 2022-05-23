import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  //   console.log(active);
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink
          exact={true}
          className={`nav-link`}
          to="/dashboard"
          activeClassName='active'
        >
          <i className="fa fa-money"/> &nbsp;Your Bookings
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          exact={true}
          className={`nav-link`}
          activeClassName='active'
          to="/dashboard/seller"
        >
          <i className="fa fa-hotel"/> &nbsp;Your Hotels
        </NavLink>
      </li>
    </ul>
  );
};

export default DashboardNav;
