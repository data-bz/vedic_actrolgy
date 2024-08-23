import React from 'react'
import s from './Header.module.sass'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className={s.container}>
        <Link className={s.link} to={'/statistic'}>Статистика</Link>
        <Link className={s.link} to={'/find'}>Пользователи</Link>
        <Link className={s.link} to={'/'}>Заказы</Link>
        <Link className={s.link} to={'/archive'}>Архив</Link>
        <Link className={s.link} to={'/messages'}>Рассылки</Link>
    </div>
  )
}

export default Header