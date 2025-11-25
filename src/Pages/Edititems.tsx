import React, { useEffect, useRef, useState} from "react";
import type { ChangeEvent, FormEvent  } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import "./pages.css"

interface Item{
    id:number,
    name:string,
    price:string,
    image_url?:string,
    created_at?:string,
    updated_at?:string,
}

const Edititems: React.FC = () => {
  const {id} =useParams();
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [olddata,setolddata]=useState<Item>()
  

    useEffect(()=>{
    axios.get(`https://dashboard-i552.onrender.com/api/items/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        Accept:"Application/json"
      }
    }).then(res =>{
      console.log(res)
      setolddata(res.data)
    })
  } ,[id])
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const edititem = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name.current?.value || "");
    formData.append("price", price.current?.value || "");
    if (image.current?.files?.[0]) {
      formData.append("image", image.current.files[0]);
    }
    formData.append("_method" ,"PUT")
    axios
      .post(
        `https://dashboard-i552.onrender.com/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
          }
        }
      )
      .then(() => {
        navigate("/dashboard/items");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row>
          <Col  className="w-100" style={{paddingLeft:"60px"}}>
          <Button
            variant="link"
            className="p-0 btn-back"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <span className="btn-back-arrow">&lt;</span>
          </Button>

          <Container fluid >
          <div className="edititems-title ">
            edit ITEM
          </div>
          <Form onSubmit={edititem} autoComplete="off">
            <Row>
              <Col md={5} xs={12}>
                <Form.Group className="mb-5" controlId="productName">
                  <Form.Label className="form-label">
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="text"
                    placeholder="Enter the product name"
                    ref={name}
                    defaultValue={olddata?.name}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="productPrice">
                  <Form.Label className="form-label">
                    Price
                  </Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="decimal"
                    placeholder="Enter the product price"
                    ref={price}
                    defaultValue={olddata?.price}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={5} xs={12}>
                <Form.Label className="form-label">Image</Form.Label>
                <div
                  className="image-upload-area"
                  onClick={() => image.current?.click()}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="image-preview"
                    />
                  ) : (
                    <div className="image-preview-wrapper">
                      <img src={ olddata?.image_url } alt="" className="image-preview" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={image}
                    onChange={handleImageChange}
                    className="file-input-hidden"
                    
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="btn-save"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
          </Container>
        </Col>
      </Row>
  );
};

export default Edititems;

