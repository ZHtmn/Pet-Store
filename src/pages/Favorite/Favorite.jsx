import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EmptyFavorite from '../../components/EmptyFavorite';
import Product from '../../components/Product'
import "./style.scss";

export default function Favorite() {
  const itemsFavorite = useSelector((state) => state.favorite.items)
  console.log(itemsFavorite)

  const navigate = useNavigate()

  const backHome = () => {
  navigate('/')
  }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//   useEffect(() => {
//     if (itemsFavorite.length === 0){
//      navigate("/emptyFavorite")   
//     }
// },[])

  if (itemsFavorite.length === 0) {
    return <EmptyFavorite/>
  } 
  
  return (
    <>
      <div className="favoriteProducts">
        {itemsFavorite.map((el) => (
          <Product key={el._id} el={el} />
        ))}
      </div>
      <div>
        <button onClick={backHome} className='back'>Вернуться назад</button>
      </div>
    </>
  )
}
