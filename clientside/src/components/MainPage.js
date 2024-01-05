import MainContent from "./MainContent";
import './MainPage.css';
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const MainPage = () =>{

    const navigate = useNavigate();

    return(
        <div className="page-wrapper">
                <Header />
                <div className="inner-block">
                    <div className="innerest-block">
                        <MainContent />
                        <div style={{margin: "20px"}}>
                            <Button onClick={() => navigate('/fetchApi')}>
                                Access Now
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>

    );

}

export default MainPage;