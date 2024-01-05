import activeCampaignIcon from '../icons/activecampaign-icon.png';
import mondayIcon from '../icons/monday-icon.png';
import './Header.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const mondayCom ='https://monday.com/';
const activeCampaign = "https://www.activecampaign.com/";

const Header = () => {

    const navigate = useNavigate();

    return(
        <>
           <div className='headerBlock'>
            <div className='header'>
                    <div className='img-div'>
                        <a href={activeCampaign} target='_blank'><img className='ac-image' src={activeCampaignIcon} alt='activecampaign-icon'/></a>
                        <a href={mondayCom}  target='_blank'><img className='mcom-image' src={mondayIcon} alt='monday-icon'/></a>
                    </div>
                    <div className='btn-div'>
                        <a onClick={()=>{navigate('/')}}>Home</a>
                        <a onClick={()=>{navigate('/fetchApi')}}>Get Access</a>
                    </div>
                    <div class="dropdown">
                       <div className="burger-sign">
                            <span style={{color:"white"}}>|</span>
                            <span style={{color:"white"}}>|</span>
                            <span style={{color:"white"}}>|</span>
                       </div>
                        <div class="dropdown-content">
                            <a onClick={()=>{navigate('/')}}>Home</a>
                            <a onClick={()=>{navigate('/fetchApi')}}>Get Access</a>
                        </div>
                    </div>
            </div>
           </div>
        </>
    );
}

export default Header;