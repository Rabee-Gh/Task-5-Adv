import React, { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./pages.css"
const Additems: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const additem = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name.current?.value || "");
    formData.append("price", price.current?.value || "");
    if (image.current?.files?.[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .post(
        "https://dashboard-i552.onrender.com/api/items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
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
    <Row className="w-100">
      <Col  className="w-100" style={{paddingLeft:"60px"}}>
        <Button
          variant="link"
          className="p-0 back-button"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <span className="back-arrow">&lt;</span>
        </Button>

        <Container fluid>
          <div className="title">ADD NEW ITEM</div>
          <Form onSubmit={additem} autoComplete="off">
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="mb-5" controlId="productName">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="text"
                    placeholder="Enter the product name"
                    ref={name}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>
                <Form.Group className="mb-5" controlId="productPrice">
                  <Form.Label className="form-label">Price</Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="decimal"
                    placeholder="Enter the product price"
                    ref={price}
                    required
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Label className="form-label">Image</Form.Label>
                <div
                  className="image-upload-area"
                  onClick={() => image.current?.click()}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <img src="/assets/uploadicon.png" alt="" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={image}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    required
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                <Button type="submit" className="save-button">
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

export default Additems;

