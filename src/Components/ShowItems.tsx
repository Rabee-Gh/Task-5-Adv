import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import CustomPagination from "./Pagination";
import './components.css';

interface Item {
  id: number;
  name: string;
  price: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface ShowItemsProps {
  search: string;
}

const PAGE_SIZE = 8;

const ShowItems: React.FC<ShowItemsProps> = ({ search }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsDeleted, setItemsDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dashboard-i552.onrender.com/api/items", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      });
  }, [itemsDeleted]);

  useEffect(() => {
    let arr = items;
    if (search.trim()) {
      arr = items.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    setFilteredItems(arr);
    setPage(1);
  }, [items, search]);

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const pagedItems = filteredItems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios
        .delete(
          `https://dashboard-i552.onrender.com/api/items/${deleteId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        )
        .then(() => {
          setItemsDeleted((x) => !x);
          setShowDelete(false);
        });
    }
  };

  return (
    <div className="show-items-container">
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Body className="modal-body-custom">
          <div className="modal-message">
            Are you sure you want to delete the product?
          </div>
          <div className="buttons-wrapper">
            <Button variant="warning" className="modal-btn" onClick={confirmDelete}>
              Yes
            </Button>
            <Button variant="warning" className="modal-btn" onClick={() => setShowDelete(false)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {loading && (
        <div className="loading-text">
          Loading The Products ...
        </div>
      )}

      <Row className="g-4 justify-content-center">
        {pagedItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <div
              className="product-card"
              onClick={() => navigate(`/dashboard/items/iteminfo/${item.id}`)}
            >
              <img
                src={item.image_url || "/assets/default.png"}
                alt={item.name}
              />
              <div className="card-hover-overlay">
                <div className="item-name">{item.name}</div>
                <div className="d-flex">
                  <Button
                    variant="warning"
                    size="sm"
                    className="btn-edit"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/dashboard/items/edit/${item.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="btn-delete"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <CustomPagination current={page} total={totalPages} onChange={setPage} />
      )}
      {!loading && pagedItems.length === 0 && (
        <div className="no-products-text">
          There is No Product in This Name
        </div>
      )}
    </div>
  );
};

export default ShowItems;

  