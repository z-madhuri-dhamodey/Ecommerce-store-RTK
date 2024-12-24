import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchOneProduct(productId);
  }, []);

  const fetchOneProduct = async (id) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      console.log('data', data);
      setProduct(data);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <div style={cardStyle}>
      {Object.keys(product).length === 0 ? (
        
        <div>...Loading</div>
      ) : (
        <>
          <div>
            <img src={product.image} alt={product.name} style={imageStyle} />
          </div>
          <div style={detailsStyle}>
            <h2 style={nameStyle}>{product.title}</h2>
            <p style={desStyle}>{product.description}</p>
            <p style={priceStyle}>Price: ${product.price}</p>
            <p style={priceStyle}>Rating: {product.rating?.rate || 'N/A'}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '25px',
  maxWidth: '600px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  margin: '60px auto',
};

const imageStyle = {
  width: '250px',
  height: '250px',
  objectFit: 'contain',
  borderRadius: '8px',
};

const detailsStyle = {
  marginLeft: '20px',
  flex: 1,
};

const nameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const priceStyle = {
  fontSize: '18px',
  color: '#555',
  fontWeight: 'bold',
};

const desStyle = {
  fontSize: '18px',
  color: '#555',
};
