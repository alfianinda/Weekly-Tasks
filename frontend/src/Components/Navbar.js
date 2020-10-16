import React from 'react';
import { AuthContext } from './../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import '../Assets/scss/Fixed.scss';
import '../Assets/scss/Navbar.scss';

const Navbar = () => {

    const {  
        stateAuth,
        logout
       } = React.useContext (AuthContext);

    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        logout();
        alert("Thank You..");
        history.push("/");
      };

    return (
    <div>
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
            <i className="fa fa-bars" />
            </label>
            <Link to="/">
              <label className="logo pointer">Onyx Island</label>
            </Link>
            <ul>
            {localStorage.token && localStorage.token !== "undefined" ? <li><Link to={`/list/${stateAuth.userData && stateAuth.userData.id}`}>My Tasks</Link></li>:
                      null
                    }

            {localStorage.token && localStorage.token !== "undefined" ? <li><Link to="/profile">My Profile</Link></li>:
                      null
                    }
            
            <li><Link to="/all">All Employee's Tasks</Link></li>
            
            {localStorage.token && localStorage.token !== "undefined" && <li><Link to="/" onClick={handleSubmit}>Logout</Link></li>}
            </ul>
        </nav>
    </div>
    )
}

export default Navbar