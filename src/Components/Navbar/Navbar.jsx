import { Link } from 'react-router-dom';
import './Navbar.css';
import Menu_Icon from '../../assets/menu.png';
import Logo_Img from '../../assets/logo.png';
import Search_Icon from '../../assets/search.png';
import Upload_Icon from '../../assets/upload.png';
import More_Icon from '../../assets/more.png';
import Notification_Icon from '../../assets/notification.png';
import Profile_Icon from '../../assets/jack.png';

const Navbar = ({setSideBar}) => {
    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img className='menu-icon' onClick={()=>setSideBar(prev=>prev===false?true:false)} src={Menu_Icon} alt="menu-icon" />
                <Link to="/"><img className='logo-img' src={Logo_Img} alt="logo-img" /></Link>
            </div>

            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder='Search' disabled/>
                    <img src={Search_Icon} alt="search-icon" />
                </div>
            </div>

            <div className="nav-right flex-div">
                <img src={Upload_Icon} alt="upload-icon" />
                <img src={More_Icon} alt="more-icon" />
                <img src={Notification_Icon} alt="notification-icon" />
                <img className='user-icon' src={Profile_Icon} alt="profile-icon" />
            </div>
        </nav>
    );
};

export default Navbar;