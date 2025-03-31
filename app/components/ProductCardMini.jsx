const ProductCardMini = ({ title, thumbnail }) => {
    return (
      <div className="d-flex flex-column h-40 p-1 border shadow-sm">
        <img
          src={thumbnail}
          alt={title}
          className="card-img-top"
          style={{ height: "50px", width: "50px", objectFit: "cover" }}
        />
        <div className="card-body p-2">
          <h6 className="card-title mb-0" style={{ fontSize: "0.9rem" }}>
            {title}
          </h6>
        </div>
      </div>
    );
  };

export default ProductCardMini