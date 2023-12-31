import { React, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { FaHandshake, FaRegHandshake } from 'react-icons/fa'
import './Dashboard.css'
import { CreatePopup } from './addExpense'
import Expense from '../Expenses/Expense'
import api from '../../apis/axiosConfig'
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const [data, setdata] = useState()
  const token = localStorage.getItem('jwtToken')
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const fetchOweAndOwedData = async () => {
    const Data = await api.get('/oweAndOwed', config)
    setdata(Data.data)
    console.log(Data.data)
  }
  useEffect(() => {
    fetchOweAndOwedData()
  }, [])

  return (
    <>
      <div className="cont">
        <div className="dashboard-title">
          <h2>Dashboard</h2>
          <button className="add-expense-button" onClick={openModal}>
            Add Expense
          </button>
        </div>

        <div className="cards-container">
          <div className="card owe">
            <FaHandshake className="owe-icon" />
            <h3 className="card-title">You Owe</h3>
            <p className="amount">
              <span className="currency-symbol">₹</span>500
            </p>
          </div>

          <div className="card owes-you">
            <FaRegHandshake className="owes-you-icon" />
            <h3 className="card-title">Owes You</h3>
            <p className="amount">
              <span className="currency-symbol">₹</span>200
            </p>
          </div>
        </div>
      </div>
      <CreatePopup show={showModal} onClose={closeModal} />
      <Expense />
    </>
  )
}

export default Dashboard
