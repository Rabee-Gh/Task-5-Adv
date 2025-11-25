import { Button, Col, Row } from "react-bootstrap"
import {  useNavigate } from 'react-router-dom';
import "./components.css"
const Addbutton = () => {
    const navigate = useNavigate();

       function handleAdd(){
        navigate('/dashboard/items/add');
    }
  return (
                        <Row className='flex justify-content-end'>
                        <Col md={4} className="text-center   ">
                            <Button variant="warning" className="rounded-2 text-white  py-2 px-4 addcl"  onClick={handleAdd}>
                                ADD NEW PRODUCT
                            </Button>
                        </Col>
                    </Row>
  )
}

export default Addbutton