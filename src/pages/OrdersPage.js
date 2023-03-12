import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs } from "firebase/firestore";
import fireDB from '../fireConfig';
import Layout from '../components/Layout';
function OrdersPage() {
  const [loading, setLoading] = useState()
  const [orders,setOrders] = useState([])
  const navigate = useNavigate()
 
  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersarray = []
      result.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        ordersarray.push(obj)
        setLoading(false)
      })
      setOrders(ordersarray)
    } catch (error) {
      console.log(error)
      setLoading(true)
    }
  }
  
  return (
    <Layout loading={loading} >
      <div className='p-2'>
        { orders.map((order)=>{
          
        return <table className='table mt-3 order' >
          <thead>
            <tr>
              <th>Image</th>
              <th>name</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
           
            { order.cartItems.map((item)=>{
               return(
              <tr>
                <td><img src={item.imageURL} height="80" width="80" /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>)
            })}
          </tbody>
          
        </table>})
} 
</div>
    </Layout>
  )
}

export default OrdersPage