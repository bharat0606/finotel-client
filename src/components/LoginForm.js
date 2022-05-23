import { useHistory, NavLink } from "react-router-dom"

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const history = useHistory()

  const handleAction = () => {
    history.push("/register");
    return;
  }

  return (

    <>


      <div className="frame">
        <div style={{
          backgroundColor: "#000",
          opacity: .6, position: 'absolute',
          width: '100%',
          height: '100%', zIndex: -1
        }}>

        </div>
        <div className="nav">
          <ul className="links">
            <li><NavLink activeClassName='signin-active' to="/login">Sign in</NavLink></li>
            <li><NavLink className="signin-inactive" to="/register">Sign up </NavLink></li>
          </ul>
        </div>
        <div>
          <form className="form-signin" onSubmit={handleSubmit}>
            <label htmlFor="username">Email</label>
            <input className="form-styling" placeholder="Enter email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input className="form-styling" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="btn-animate">
              <button className="btn-signin" disabled={!email || !password}>SIGN IN</button>
            </div>
          </form>
        </div>
        <div>
        </div>
      </div>
    </>
  )
};

export default LoginForm;
