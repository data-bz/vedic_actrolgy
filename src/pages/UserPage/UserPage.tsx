import { logDOM } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icell } from '../../interfaces/Icell'
import s from './UserPage.module.sass'

function UserPage() {
    const {id} = useParams()
    const [profile, setProfile] = useState<Icell>()

    const navigate = useNavigate();

    const updateDone = async (elem: Icell) => {
      console.log(elem.user_id, !elem.done);
      
      try {
        const response = await fetch('https://db-project.vercel.app/api/updateDone', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: elem.id, done: !elem.done })
        });
    
        // Проверка, что ответ успешный
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const responseData = await response.text(); // Чтение как текст
        console.log('Response Data:', responseData);
    
        const data = JSON.parse(responseData); // Парсинг JSON из текста
        alert("Задача выполнена")
        window.location.reload()
        return data;
      } catch (error) {
        console.error('Error:', error);
      }
    };

    useEffect(() => {
        const getData = async () => {
          const response = await fetch('https://db-project.vercel.app/api/profiles');
          const data = await response.json();
          if(id){
            const person = data.find((elem: Icell) => elem.id == +id)
            setProfile(person)
          }          
        }
        getData()
      }, [id])
    
  return (
    <div className={s.container}>
      <img className={s.back} onClick={() => navigate(-1)} src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="" />
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
            <button className={s.doneBtn} onClick={() => profile ? updateDone(profile) : null}>Выполнено</button>
        </div>
    </div>
  )
}

export default UserPage