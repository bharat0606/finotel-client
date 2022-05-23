import { NavLink } from "react-router-dom";

const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {

  return (
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
          <li><NavLink className="signin-inactive" to="/login">Sign in</NavLink></li>
          <li><NavLink activeClassName='signin-active' to="/register">Sign up </NavLink></li>
        </ul>
      </div>
      <div>
        <form className="form-signin" onSubmit={handleSubmit}>
          <label htmlFor="username">Full Name</label>
          <input className="form-styling" type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input className="form-styling" type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>

          <input className="form-styling" type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <div className="btn-animate">
            <button disabled={!name || !email || !password} className="btn-signin">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <div>
      </div>
    </div>
  )
};

export default RegisterForm;
