import { useNavigate } from 'react-router-dom'
import nullFavorite from '../utils/nullFavorite.jpg'

export default function EmptyFavorite() {
  const navigate = useNavigate()
  const backHome = () => {
    navigate('/')
  }
  return (
    <>
      <div className='boxEmptyFavorite'>
        <div>Нет избранных товаров</div>
        <div>Добавьте сюда понравившийся товар</div>
        <div><img className='nullFavorite' src={nullFavorite}></img></div>
        <button onClick={backHome}>Назад</button>
      </div>
    </>
  )
}
