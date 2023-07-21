import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMyProduct, editMyProduct } from '../redux/slices/userReducer';
import { useLocation } from 'react-router-dom';

export default function Modal({ active, setActive, elem }) {
  const closeModal = () => {
    setActive(!active)
  }

  const location = useLocation()


  const initialValues = {
    name:elem?.name || '', stock: elem?.stock || '', price:elem?.price || '', discount:elem?.discount || '', description:elem?.description ||'', pictures:elem?.pictures || ''
  }

  const regSchema = Yup.object().shape({
    name: Yup.string('Введите строку').max(40, 'Длиное название').min(5, 'Короткое название').required('Обязательная строка'),
    stock: Yup.number('Введите кол-во').max(9999, 'Максимальное количество').required('Обязательная строка'),
    price: Yup.number('Введите цену').max(999999, 'Максимальная цена').required('Обязательная строка'),
    discount: Yup.number('Введите скидку').max(99, 'Максимальная скидка 99%').required('Обязательная строка'),
    description: Yup.string('Введите описание').max(150, 'Длинное название').required('Обязательная строка'),
    pictures: Yup.string('Ссылка на изображение').url('Укажите ссылку').required('Обязательная строка'),
  })

  const token = useSelector((state)=> state.user.token)

  const { mutate } = useMutation({
    mutationFn: (formData) => {
      if (location.pathname == '/myProducts') {
        return axios.patch(`https://api.react-learning.ru/products/${elem?._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      } else {
        return axios.post("https://api.react-learning.ru/products", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
    },
  })

  console.log(elem)

  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res, 'Форма отправлена');
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (location.pathname == '/myProducts') {
         dispatch(editMyProduct(res.data))
        } else {
          dispatch(setMyProduct(res.data))
        } 
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        closeModal()
      },
      onError: (res) => {
        alert('Произошла ошибка')
      }
    })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={regSchema} onSubmit={onSubmit}>
      {
        (formik)=> {
          return(
            <div className='modalWraper'>
              <div className='modalContainer'>
                <div className='headerModal'>
                {location.pathname=='/myProducts' ? <h3>Редактирование продукта</h3> :<h3>Добавление продукта</h3>}
              <i onClick={closeModal}  class="uil uil-times-square"></i>
                <hr/>
                </div>
                <Form>
                  <div><Field type='text' minlength='5' maxlength='40' placeholder='Название' name='name' id='name' /></div>
                  <hr/>
                    <div>
                    <ErrorMessage className='errorMessage' name='name' component='span'/>
                    </div>
                  <div><Field type='number' min='0' max='9999' placeholder='Кол-во на складе' name='stock' id='stock' /></div>
                  <hr/>
                    <div>
                      <ErrorMessage className='errorMessage' name='stock' component='span'/>
                    </div>
                  <div><Field type='number' min='0' max='999999' placeholder='Цена' name='price' id='price' /></div>
                  <hr/>
                    <div>
                      <ErrorMessage className='errorMessage' name='price' component='span'/>
                    </div>
                  <div><Field type='number' min='0' max='99' placeholder='Скидка' name='discount' id='discount' /></div>
                  <hr/>
                    <div>
                      <ErrorMessage className='errorMessage' name='discount' component='span'/>
                    </div>
                  <div><Field type='text' placeholder='Описание' name='description' id='description' /></div>
                  <hr/>
                    <div>
                      <ErrorMessage className='errorMessage' name='description' component='span'/>
                    </div>
                  <div><Field type='text' placeholder='Ссылка на изображение' name='pictures' id='pictures' /></div>
                  <hr/>
                    <div>
                      <ErrorMessage className='errorMessage' name='pictures' component='span'/>
                  </div>
                  <div>
                    {location.pathname=='/myProducts' ? <button type='submit' className='addProduct'>Сохранить</button> : <button type='submit' className='addProduct'>Добавить</button>}
                  </div>
                </Form>
              </div>
            </div>
          )
        }
      }
    </Formik>
  )
}
