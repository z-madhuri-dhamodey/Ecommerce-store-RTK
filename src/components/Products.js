import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data:  products, status,  } = useSelector((state) => state.product);
  // const [products, setProducts] = useState([]);


  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //     const res = await fetch('https://fakestoreapi.com/products');
    //     const data = await res.json();
    //     console.log(data);
    //     setProducts(data);
    // };
    // fetchProducts();
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }


  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>Price: ${product.price}</h5>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <button onClick={() => handleAdd(product)} className="btn">
              Add to cart
            </button>
            <button onClick={() => navigate(`/product-detail/${product.id}`)} className="btn">
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
