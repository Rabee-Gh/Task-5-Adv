import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./pages.css"
interface Item {
  id: number;
  name: string;
  price: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

const formatDate = (dateStr?: string) =>
  dateStr ? new Date(dateStr).toLocaleDateString("en-GB") : "--";

const formatPrice = (price?: string) =>
  price ? `${parseFloat(price).toFixed(2)}$` : "--";

const ItemInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://dashboard-i552.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "Application/json",
        },
      })
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="iteminfo-container">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Row>
      <Col>
        <Button
          variant="link"
          className="back-button p-0"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <span className="back-icon">&lt;</span>
        </Button>

        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col md={12} className="text-start">
              <h1 className="item-name">{item?.name || "--"}</h1>
              <div className="image-wrapper d-flex justify-content-center">
                <img
                  src={
                    item?.image_url ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475"
                  }
                  alt={item?.name || "Item preview"}
                  className="item-image"
                />
              </div>

              <Row className="price-added-row mb-4 d-flex">
                <Col md={5} className="text-start">
                  <span className="price-label">Price:</span>
                  <span className="price-value">{formatPrice(item?.price)}</span>
                </Col>
                <Col md={5} className="text-start" >
                  <span className="added-label">Added At:</span>
                  <span className="added-value">{formatDate(item?.created_at)}</span>
                </Col>
              </Row>

              <Row className="updated-row mb-2 d-flex justify-content-center">
                <Col md={12} className="text-center">
                  <span className="updated-label">Updated At:</span>
                  <span className="updated-value">{formatDate(item?.updated_at)}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default ItemInfo;
