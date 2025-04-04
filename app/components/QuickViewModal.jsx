'use client';

import React , {useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function QuickViewModal({ show, onHide, product, addToCart }) {
 

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-5">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7">
            <h5 className="mb-2 text-muted">{product?.category}</h5>
            <p>{product?.description}</p>
            <h4 className="text-primary mt-3">${product?.price}</h4>
            <Button
              variant="success"
              className="mt-3"
              onClick={() => {
                addToCart(product);
                onHide();
              }}
            >
              🛒 Add to Cart
            </Button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
