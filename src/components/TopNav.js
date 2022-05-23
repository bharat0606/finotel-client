import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card } from "antd";
import moment from "moment";
import { getNameInitials } from "../helper";

const { Meta } = Card;

const TopNav = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [showFullMenu, setShowFullMenu] = useState(true)
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const active = window.location.pathname;

  useEffect(() => {
    handleResize();
    // window.addEventListener("resize", handleResize)
  }, []);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
      setShowFullMenu(false)
    } else {
      setIsMobile(false)
    }
  }

  const handleMobileView = () => {
    setShowFullMenu(!showFullMenu)
  }

  return (
    <div className="top-nav nav">
      {isMobile && <div className="mobile-side-nav">
        <NavLink exact={true} activeClassName='active' className="nav-link logo-link" to="/">
          <span className="first">
            Fi
          </span>
          <span className="second">
            no
          </span>
          <span className="third">
            tel
          </span>
        </NavLink>
        <div>
          <i className="fa fa-bars" onClick={handleMobileView}></i>
        </div>
      </div>}
      {showFullMenu && <>
        <div className="d-flex justify-content-between align-items-center">
          {!isMobile && <NavLink exact={true} activeClassName='active' className="nav-link logo-link" to="/">
            <span className="first">
              Fi
            </span>
            <span className="second">
              no
            </span>
            <span className="third">
              tel
            </span>
          </NavLink>}

          {auth !== null && (
            <>
              <NavLink exact={true} activeClassName='active' className="nav-link" to="/">
                <i className="fa fa-fw fa-home" /> {!isMobile && 'Home'}
              </NavLink>
              <NavLink className="nav-link" to="/dashboard">
                <i className="fa fa-dashboard"></i> {!isMobile && 'Dashboard'}
              </NavLink>
              {auth.hotelCount ? (<NavLink className="nav-link" to="/cabs">
                <i className="fa fa-cab"></i> {!isMobile && 'Cabs'}
              </NavLink>) : ''}
            </>
          )}

        </div>

        <div className="d-flex justify-content-between align-items-center right-nav">

          {auth === null && (
            <>
              <NavLink className="nav-link" to="/login">
                <i className="fa fa-fw fa-user"></i>Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                <i className="fa fa-user-plus"></i> Register
              </NavLink>
            </>
          )}
          {auth !== null && (
            <>
              <span className="rounded-avatar"
                height="22">{getNameInitials(auth.user.name)}</span>
              &nbsp;
              <div className="user-info">
                <span>{auth.user.name}</span>
                <small>Joined {moment(auth.user.createdAt).fromNow()}</small>
              </div>

              <a className="nav-link pointer" href="#" onClick={logout}>
                <i className="fa fa-sign-out"></i> {!isMobile && 'Logout'}
              </a>
            </>

          )}
        </div>

      </>}

    </div>
  );
};

export default TopNav;
