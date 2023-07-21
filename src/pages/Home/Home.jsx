import { useEffect, useState } from "react";
import "./style.scss";
import Dog from "../../utils/Dog-Face.png";
import User from "../../utils/iconuser.png";
import Busket from "../../utils/shopping.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Product from "../../components/Product";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Skeleton from "../../components/Skeleton/Skeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate()

  const fav = () => {
    navigate('/favorite')
  }

  const busket = () => {
    navigate('/cart')
  }

  const myProduct = () => {
    navigate('/myProducts')
  }

  const totalPrice = useSelector((state)=>state.cart.totalPrice)

  useEffect(() => {
    axios
      .get("https://api.react-learning.ru/products/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setProducts(res.data.products);
        setIsLoading(false)
      });
  }, []);
  console.log(products);

  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(!modal)
  }

  const skeletons = [...new Array(8)].map((el) => {
    return <Skeleton/>
  })

  return (
    <>
      <div className="header">
        <a href="/">
          <img src={Dog} className="logo" alt="dog" />
        </a>
        <div className="store">
          <div>BelkaStore</div>
          <div>Все для животных</div>
        </div>
        <div className="search">
          <input placeholder="Поиск" />
        </div>
        <div className="priceHome">
        <a href="#">
          <img onClick={busket}  src={Busket} className="busket" alt="busket" />
        </a>
          <div>{totalPrice}₽</div>
        </div>
        <a href="#">
          <img src={User} className="user" alt="user" />
        </a>
      </div>
      <div className="header2">
        <Button variant="info">Все товары()</Button>{" "}
        <Button onClick={fav} variant="info">Избраное</Button>{" "}
        <Button onClick={openModal} variant="success">Добавить продукт</Button>{" "}
        <Button onClick={myProduct} variant="secondary">Мои продукты</Button>{" "}
      </div>
      {modal && (<Modal active={modal} setActive={setModal} />)}
      <div className="products">
        {isLoading 
          ? skeletons
          : products.map((el) => (
          <Product key={el._id} el={el} />
        ))}
      </div>
      
    </>
  );
}
