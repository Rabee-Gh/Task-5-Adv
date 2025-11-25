import { useNavigate } from 'react-router-dom';
import { Package, Heart, ClipboardList, LogOut } from 'lucide-react';
import { Image, Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import './components.css';

interface SidebarProps {
  proimg: string | null;
  username: string | null;
}

const Sidebar = ({ proimg, username }: SidebarProps) => {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        'https://dashboard-i552.onrender.com/api/logout',
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile_image_url');
        localStorage.removeItem('user_name');
        navigate('/');
      })
      .catch((err) => {
        console.error('Logout error:', err);
      });
  };

  const [activeLink, setActiveLink] = useState('products');

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  return (
    <>
      <div className="text-center mb-4">
        <Image src={`${import.meta.env.BASE_URL}assets/Logo.png`}  alt="Focal X Logo" fluid className="sidebar-logo" />
      </div>

      <Card className="border-0 rounded-lg mb-5" style={{ background: 'none' }}>
        <Card.Body className="text-center d-flex flex-column align-items-center pb-0">
          {proimg ? (
            <Image src={proimg} alt="profile img" roundedCircle className="profile-image" />
          ) : (
            <div className="profile-placeholder">
              <Heart size={48} />
            </div>
          )}
          <Card.Title as="h5" className="text-dark fw-bold">
            {username}
          </Card.Title>
        </Card.Body>
      </Card>

      <Nav className="flex-column flex-grow-1">
        <Nav.Item className="mb-2">
          <Nav.Link
            href="#"
            className={`nav-link-custom rounded-2 ${
              activeLink === 'products' ? 'active-orange' : 'hover-bg-light'
            }`}
            onClick={() => handleLinkClick('products')}
          >
            <Package size={20} />
            Products
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="mb-2">
          <Nav.Link
            href="#"
            className={`nav-link-custom rounded-2 ${
              activeLink === 'favorites' ? 'active-orange' : 'hover-bg-light'
            }`}
            onClick={() => handleLinkClick('favorites')}
          >
            <Heart size={20} />
            Favorites
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className="mb-2">
          <Nav.Link
            href="#"
            className={`nav-link-custom rounded-2 ${
              activeLink === 'orderList' ? 'active-orange' : 'hover-bg-light'
            }`}
            onClick={() => handleLinkClick('orderList')}
          >
            <ClipboardList size={20} />
            Order List
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Button onClick={logout} className="logout-button">
        Logout
        <LogOut size={20} />
      </Button>
    </>
  );
};

export default Sidebar;
