import {  Col, InputGroup, Row ,Form, Button} from "react-bootstrap"
import {  LucideSearch } from 'lucide-react';
interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
    

  return (
                        <Row className="mb-5 align-items-center justify-content-center" >
                        <Col md={9} >
                            <InputGroup >
                                <Form.Control 
                                    type="text"
                                    placeholder="Search product by name"
                                    className="rounded-4 border-0 shadow-sm py-3"
                                    value={value}
                                    onChange={onChange}
                                    style={{  paddingLeft: '20px', border: '1px solid #E5E5E5' }} 
                                />
                                <Button variant="light" className="rounded-pill border-0 ms-n5 bg-transparent" style={{left: '-50px' }}>
                                    <LucideSearch size={20} color="#6c757d" />
                                </Button>
                            </InputGroup>
                        </Col>
                        
                    </Row>


  )
}

export default Search