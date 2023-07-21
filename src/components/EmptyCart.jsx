import { useNavigate } from 'react-router-dom'
import nullCurt from '../utils/nullCurt.jpg'

export default function EmptyCart() {
  const navigate = useNavigate()
  const backHome = () => {
    navigate('/')
  }
  return (
    <>
    
      <div className='boxEmptyCurt'>
        <div>Корзина пустая</div>
        <div>Для заказа товаров перейдите на главную страницу</div>
        <div><img className="nullCurt" src={nullCurt}></img></div>
        <button className='addProduct' onClick={backHome}>Назад</button>
      </div>
    </>
  )
}
