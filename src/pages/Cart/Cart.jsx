import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../../components/EmptyCart';
import ProdInCart from '../../components/ProdInCart';
import { dellCurt } from '../../redux/slices/cartReducer';
import "./style.scss";

export default function Cart() {
  const totalCount = useSelector((state) => state.cart.totalCount)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  const navigate = useNavigate()

  const backPages = () => {
    navigate('/')
  }
  const itemsCurt = useSelector((state) => state.cart.items)
  console.log(itemsCurt)

  const dispatch = useDispatch()
  const dell = () => {
    if (window.confirm('Вы уверены?')) {
      dispatch(dellCurt())
    }
  }

  if (itemsCurt.length === 0) {
    return <EmptyCart/>
  }

  return (
    <>
      <div className="curtProducts">
        {itemsCurt.map((el) => (
          <ProdInCart key={el._id} el={el} />
        ))}
      </div>
      <div className='box1'>
        <div>Всего товаров: {totalCount }</div>
        <div>Сумма заказа: {totalPrice}</div>
      </div>
      <div className='box2'>
        <button onClick={backPages} className='back'>Вернуться назад</button>
        <button className='buy'>Оплатить сейчас</button>
      </div>
      <div>
        <button onClick={dell}>Очистить корзину</button>
      </div>
    </> 
  )
}
