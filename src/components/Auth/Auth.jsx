import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setToken, setUserId } from '../../redux/slices/userReducer';

export default function Auth() {
  const initialValues = {
    email:'', password:''
  }
  const regSchema = Yup.object().shape({
    email: Yup.string('Введите строку').email('Невалидная почта').min(5, 'Адрес слишком короткий').required('Обязательная строка'),
    password: Yup.string().min(6, 'Пароль слишком короткий').required('Обязательная строка')
  })

  const { mutate } = useMutation({
    mutationFn: (formData) => {
      return axios.post("https://api.react-learning.ru/signin", formData)
    }
  })

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        console.log(res, 'Выполнен вход')
        dispatch(setToken(res.data.token));
        dispatch(setUserId(res.data.data._id))
        navigate('/')
      },
      onError: (res) => {
        alert('Произошла ошибка')
      }
    })
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={regSchema}>
      {
        (formik) => {
          return (
            <>
              <h1>Авторизация</h1>
              <Form>
                <div><Field type='email' placeholder='email' name='email' id='email' /></div>
                  <div>
                    <ErrorMessage name='email' component='span'/>
                  </div>
                <div><Field type='password' placeholder='password' name='password' id='password' /></div>
                  <div>
                    <ErrorMessage name='password' component='span'/>
                  </div>
                <div>
                  <button type='submit'>Войти</button>
                </div>
              </Form>
              <div>У вас еще нет аккаунта?<Link to='/reg'>Зарегистрироваться</Link></div>
            </>
          )
        } 
      }
    </Formik>
  )
}
