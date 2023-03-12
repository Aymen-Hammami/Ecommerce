import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'
import {addDoc,collection} from 'firebase/firestore'
import fireDB from '../fireConfig';
import {toast} from 'react-toastify'
function Cartpage() {
  const { cartItems } = useSelector(state => state.cartReducer)
  const [totalAmount, setTotalAmount] = useState(0)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("")
  const [adress, setAdress] = useState("")
  const [pincode, setPinCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price
    });
    setTotalAmount(temp)
  }, [cartItems])

  const deleteFromCart = (product) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product })
  }
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])
  const placeOrder = async() => {
    const adressInfo = { name, adress, pincode, phoneNumber }
    const orderInfo = {
      cartItems,
      adressInfo,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      userid:JSON.parse(localStorage.getItem('currentUser')).user.uid,
      totalAmount
    }
      try {
        setLoading(true)
        const result = await addDoc(collection(fireDB,"orders"),orderInfo)
        setLoading(false)
        toast.success("reservation mchat")
        handleClose()
        
      } catch (error) {
        toast.error("reservation mamchetech")
      }
    }

  return (
    <div>
      <Layout loading={loading}>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>name</th>
              <th>price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              return <tr>
                <td><img src={item.imageURL} height="80" width="80" /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td><FaTrash onClick={() => deleteFromCart(item)} /></td>
              </tr>
            })}
          </tbody>
        </table>

        <div className='d-flex justify-content-end'>
          <h1 className='total-amount'> Total amount ={totalAmount} dt</h1>
        </div>
        <div className='d-flex justify-content-end'>
          <button className='total-amount' onClick={handleShow}> Place order</button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD YOUR ADRESS</Modal.Title>
          </Modal.Header>
          <Modal.Body className="register-form"> <h2>Register</h2>
            <hr />
            <input type="text" className='form-control' placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }} />

            <textarea rows={3} className='form-control' placeholder='adress' value={adress} onChange={(e) => { setAdress(e.target.value) }} />

            <input type="number" className='form-control' placeholder='pin code  ' value={pincode} onChange={(e) => { setPinCode(e.target.value) }} />

            <input type="number" className='form-control' placeholder='Phone number   ' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
            <hr /></Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" onClick={placeOrder}>
              ORDER
            </button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </div>
  )
}

export default Cartpage