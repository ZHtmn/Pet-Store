import { useDispatch } from 'react-redux'
import { addItem, decrement, deleteItem } from '../redux/slices/cartReducer'

export default function ProdInCart({ el }) {
  const dispatch = useDispatch()
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const discount = (el.price - (el.price * el.discount/100)) * el.count

  const dellCurt = (e) => {
    if (window.confirm('Вы уверены?')) {
      dispatch(deleteItem(el))
    }
  }

  const max = () => {
    dispatch(addItem(el))
  }

  const min = () => {
    dispatch(decrement(el))
  }

  return (
    <div className='box'>
      <img src={el.pictures} alt='#'></img>
      <div className='title'>{ el.name}</div>
      <button disabled={el.count === 1} onClick={min} className='min'>-</button>
      <div>Кол-во: {el.count}</div>
      <button onClick={max} className='max'>+</button>
      <div className='price'>{el.price * el.count}₽</div>
      <div className='priceDiscount'>{discount}₽</div>
      <button onClick={dellCurt} className='х'>х</button>
    </div>
  )
}
