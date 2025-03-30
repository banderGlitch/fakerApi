// Product skeleton

const ProductSkeleton = () => {
    return (
        <div className="card h-100 placeholder-glow">
            <div className="card-img-top bg-secondary placeholder" style={{height:"200px"}}/>
                <div className="card-body">
                    <h5 className="card-title placeholder col-8"></h5>
                    <p className="card-text placeholder col-4"></p>
                    <p className="placeholder col-12"></p>
                    <a className="btn btn-primary disabled placeholder col-6 mt-3"></a>
                </div>
            </div> 
    )
}

export default ProductSkeleton;
