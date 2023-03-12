import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import Layout from '../components/Layout'
import { fireproducts } from '../articles';
import { async } from '@firebase/util';
import { use } from 'bcrypt/promises';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Homepage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector(state => state.cartReducer)
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()
  const [searchkey, setSearchkey] = useState("")
  const [filtertype, setFilterType] = useState("")

  const navigate = useNavigate()
  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setLoading(true)
    try {
      const users = await getDocs(collection(fireDB, "products"))
      const productsarray = []
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        productsarray.push(obj)
        setLoading(false)
      })
      setProducts(productsarray)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className='w-50'>
          <input type="text" className='form-control' placeholder='search item' value={searchkey} onChange={(e) => { setSearchkey(e.target.value) }} />
          <select name='' id='' className='form-control' value={filtertype} onChange={(e) => { setFilterType(e.target.value) }}>
            <option value='mechanics'>mechanics</option>
            <option value='fashion'>fashion</option>
            <option value="electronics">electronics</option>
            <option value="">ALL</option>
          </select>
        </div>
        <div className='row'>
          {products.filter(obj => obj.name.toLowerCase().includes(searchkey))
            .filter(obj => obj.category.toLowerCase().includes(filtertype))
            .map((product) => {
              return <div className='col-md-4'>
                <div className="m-2 p-1 product position-relative">
                  <p>{product.name}</p>
                  <div className="text-center">
                    <img src={product.imageURL} alt="" className='product-img' />
                  </div>
                  <div className='product-actions'>
                    <h2>{product.price} dt</h2>
                    <div className='d-flex'>
                      <button className='mx-2' onClick={() => addToCart(product)}>Add to Cart</button>
                      <button className='mx-2' onClick={() => {
                        navigate(`/productinfo/${product.id}`)
                      }}>View</button>
                    </div>
                  </div>
                </div>

              </div>

            })}
        </div>

      </div>
    </Layout>
  )
}

export default Homepage