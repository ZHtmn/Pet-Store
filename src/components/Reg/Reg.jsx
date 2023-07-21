import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Reg() {
  const initialValues = {
    email:'', password:'', name:'', group:''
  }
  const regSchema = Yup.object().shape({
    email: Yup.string('Введите строку').email('Невалидная почта').min(5, 'Адрес слишком короткий').required('Обязательная строка'),
    password: Yup.string().min(6, 'Пароль слишком короткий').required('Обязательная строка'),
    name: Yup.string().min(2).max(20).required('Обязательная строка'),
    group: Yup.string().min(4).max(4).required('Обязательная строка'),
  })
  const { mutate } = useMutation({
    mutationFn: (formData) => {
      return axios.post("https://api.react-learning.ru/signup", formData)
    }
  })

  const navigate = useNavigate()

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (res) => {
        navigate('/login')
        
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
              <h1>Регистрация</h1>
              <Form>
                <div><Field type='email' placeholder='email' name='email' id='email' /></div>
                  <div>
                    <ErrorMessage name='email' component='span'/>
                  </div>
                <div><Field type='password' placeholder='password' name='password' id='password' /></div>
                  <div>
                    <ErrorMessage name='password' component='span'/>
                  </div>
                <div><Field type='text' placeholder='name' name='name' id='name' /></div>
                  <div>
                    <ErrorMessage name='name' component='span'/>
                  </div>
                <div><Field type='text' placeholder='group' name='group' id='group' /></div>
                  <div>
                    <ErrorMessage name='group' component='span'/>
                  </div>
                <div>
                  <button type='submit'>Зарегистрироваться</button>
                </div>
              </Form>
              <div>У вас уже есть аккаунт?<Link to='/login'>Логин</Link></div>
            </>
          )
        } 
      }
    </Formik>
  )
}
