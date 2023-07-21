import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addItem } from "../redux/slices/cartReducer";
import { addFavourite, deleteFavorite, selectCurentItem } from "../redux/slices/favoritesReducer";
import { dellMyProduct } from "../redux/slices/userReducer";

export default function Product({ el, setActive, setElem }) {

  const token = useSelector((state) => state.user.token)
  
  const dispatch = useDispatch()

  const curentItem = useSelector(selectCurentItem(el._id))

  const addCurt = (e) => {
    dispatch(addItem(el))
  }

  const addFavorite = (e) => {
    dispatch(addFavourite(el))
  }

  const del = (e) => {
    dispatch(deleteFavorite(el))
  }

  const dellProd = (e) => {
    axios.delete(`https://api.react-learning.ru/products/${el?._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log(res)
      dispatch(dellMyProduct(el))
    }).catch((err) => {
      dispatch(dellMyProduct(el))
    })
  }

  const location = useLocation()
  console.log(location.pathname)

  const editCurt = () => {
    setActive(true)
    setElem(el)
  }

  return (
    <Card style={{borderRadius:"10px", width: "18rem" }}>
      {curentItem ? <i onClick={del} class="uil uil-heart-alt active"></i> : 
      <i onClick={addFavorite} class="uil uil-heart-alt "></i>}
      <Card.Img style={{ width: "10rem", margin: '0 auto' }} variant="top" src={el.pictures} />
      <Card.Body>
        <Card.Title>{el.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{el.stock === 0 ? 'Нет в наличии' : 'Наличие:'+ el.stock }</ListGroup.Item>
        <ListGroup.Item>SALE: { el.discount}%</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Text >{el.price}₽</Card.Text>
        {location.pathname == '/myProducts' ? <Button variant="success" onClick={editCurt}>+ Редактировать </Button> : <Button variant="success" onClick={addCurt}>+ Добавить</Button>}
        {location.pathname == '/myProducts' && <Button variant="error" onClick={dellProd}> Удалить </Button> }
      </Card.Body>
    </Card>

  );
}
