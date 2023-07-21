import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EmptyFavorite from '../../components/EmptyFavorite';
import Product from '../../components/Product'
import Modal from '../Modal';
import "./style.scss";

export default function MyProducts() {
  const items = useSelector((state) => state.user.myProducts)
  console.log(items)

  const [modal, setModal] = useState(false)

  const [elem, setElem] =useState({})

  const navigate = useNavigate()

  const backHome = () => {
  navigate('/')
  }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  if (items.length === 0) {
    return <EmptyFavorite/>
  } 
  
  return (
    <>
      <div className="favoriteProducts">
        {items.map((el) => (
          <Product setElem={setElem} setActive={setModal} key={el._id} el={el} />
        ))}
      </div>
      <div>
        <button onClick={backHome} className='back'>Вернуться назад</button>
      </div>
      {modal && (<Modal elem={elem} active={modal} setActive={setModal} />)}
    </>
  )
}
