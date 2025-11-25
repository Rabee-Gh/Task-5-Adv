
import  { useEffect, useState, type CSSProperties } from 'react'; 
import { Outlet, useNavigate } from 'react-router-dom';
import { Container,  Col, Button } from 'react-bootstrap'; 
import Sidebar from '../Components/Sidebar';
import "./pages.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true); 
    const [position ,setposition]=useState<CSSProperties['position']>(`relative`);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setSidebarOpen(false); 
                setposition(`absolute`)
            } else {
                setSidebarOpen(true); 
                setposition(`relative`)
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const profileImageUrl = localStorage.getItem('profile_image_url');
    const userName = localStorage.getItem('user_name');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Container fluid className="dashboard-container">
            <div className="g-0 d-flex" >

                <div style={{position:"relative",zIndex:"2000"}}>

                <Col xs={12} className="d-lg-none p-2 toside"> 
                    <Button onClick={toggleSidebar} variant="primary" style={{width:"160px"}}>
                        {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                    </Button>
                </Col>

                <Col md={3} className={`sidebar-col ${sidebarOpen ? 'd-flex' : 'd-none '}`} style={{position:position}}>


                    <Sidebar proimg={profileImageUrl} username={userName}/>
                </Col>

                </div>
               

                <Col  className="content-col d-block stubid" >
                    <Outlet />
                </Col>
            </div>
        </Container>
    );
};

export default Dashboard;
