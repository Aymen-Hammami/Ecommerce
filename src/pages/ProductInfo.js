
import React, { useEffect, useState } from 'react'
import { getDoc, collection, doc } from "firebase/firestore";
import fireDB from '../fireConfig';
import Layout from '../components/Layout'
import { fireproducts } from '../articles';
import { async } from '@firebase/util';
import { use } from 'bcrypt/promises';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function ProductInfo() {
  const {cartItems} = useSelector(state=>state.cartReducer)
  const [product, setProduct] = useState([]);
  const params = useParams()
  const [loading,setLoading]=useState()
  const dispatch = useDispatch() 
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    setLoading(true)
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.productid))
      setProduct(productTemp.data())
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }
  const addToCart = (product)=>{
    dispatch({type:'ADD_TO_CART',payload:product})
}
useEffect(() => {
  localStorage.setItem('cartItems',JSON.stringify(cartItems))
}, [cartItems])
console.log(product)
  return (
    <div>
      <Layout loading={loading}>
        
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <h1>  Product Info:</h1>
              {
                product && (<div>
                  <p><b>{product.name}</b></p>
                  <img src={product.imageURL} alt="product image " className='product-info-img' />
                  <hr />
                  <p>{product.description}</p>
                  <div className='d-flex justify-content-end my-3' >
                    <button onClick={()=>addToCart(product)}><b>Add to cart</b></button>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default ProductInfo