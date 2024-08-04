import { logDOM } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icell } from '../../interfaces/Icell'
import s from './UserPage.module.sass'

function UserPage() {
    const {id} = useParams()
    const [profile, setProfile] = useState<Icell>()

    useEffect(() => {
        const getData = async () => {
          const response = await fetch('https://db-project.vercel.app/api/profiles');
          const data = await response.json();
          const person = data.find((elem: Icell) => elem.user_id == id)
          console.log(person);
          
          setProfile(person)
        }
        getData()
      }, [id])
    
  return (
    <div className={s.container}>
        <div className={s.innerContainer}>
            <div className={s.leftSide}>
                <p className={s.block}>Имя и Фамилия</p>
                <p className={s.block}>Дата рождения</p>
                <p className={s.block}>Время рождения</p>
                <p className={s.block}>Место рождения</p>
                <p className={s.block}>Вопрос/пакет</p>
            </div>
            <div className={s.rightSide}>
                <p className={s.block}>{profile?.name}</p>
                <p className={s.block}>{profile?.birth_data}</p>
                <p className={s.block}>{profile?.birth_time}</p>
                <p className={s.block}>{profile?.country} - {profile?.city}</p>
                <p className={s.block}>{profile?.service}</p>
            </div>
        </div>
    </div>
  )
}

export default UserPage