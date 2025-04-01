import React from 'react';
// import { useSavedProducts } from '../hooks/useSavedProduct';
//  Product card here 
const ProductCard = ({ title, price, thumbnail, description, key, id , toggleSaved, isSaved }) => {

    // const { toggleSaved, isSaved }  = useSavedProducts()
    
 
    
    return (
        <div className='card h-100 shadow-sm' key={key}>
            <div className='position-absolute end-0 m-2 left-100'>
                <button className='btn btn-sm' onClick={() => toggleSaved(id)}>
                    {isSaved(id) ?  '❤️' : '🤍' }
                </button>
            </div>
            <img
                src={thumbnail}
                className="card-img-top"
                alt={title}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{title}</h5>
                <p className="text-muted">${price}</p>
                {description && (
                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                        {description.slice(0, 60)}...
                    </p>
                )}
                <button className="btn btn-sm btn-outline-primary mt-auto">View</button>
            </div>
        </div>
    )
}

export default ProductCard;