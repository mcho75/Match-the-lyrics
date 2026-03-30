import { useNavigate } from 'react-router-dom';
import profile from "../../../assets/profile_pic.png";

export default function Header() {

    let navigate = useNavigate();
    
    return (
        <header>
            <nav>
                <li onClick={() => navigate('/')}>Accueil</li>
                <li onClick={() => navigate('/search/&')}>Recherche</li>
                <li onClick={() => navigate('/about')}>A propos</li>
            </nav>
            <div className="profile-container">
                <img className="profile-pic" src={profile} alt={"profile"} height={28}/>
                <div className="profile-info">
                    <p className="profile-name">Alice</p>
                    <p className="profile-level">Niveau 42</p>
                </div>
            </div>
        </header>
    );
}
