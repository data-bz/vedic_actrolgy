import React, { useEffect, useState } from 'react'
import s from './HomePage.module.sass'
import { Icell } from '../../interfaces/Icell'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'



function HomePage() {

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://db-project.vercel.app/api/profiles');
      let data = await response.json();
      data = data.filter((elem:Icell) => elem.done == false || elem.done == null)
      setProfiles(data)
      console.log(data);
      
      // let sum = 0
      // for(let i = 0; i < data.length; i++){
        //   sum += 
        // }
      }
    getData()
    
  }, [])

  const [profiles, setProfiles] = useState<Icell[]>()
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());

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
      window.location.reload()
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const navigate = useNavigate()
  return (
    <div className={s.container}>
      <Header></Header>
      <div className={s.innerContainer}>
        <div className={s.bottomBlock}>

          <div className={s.titles}>
            <div className={s.cell}>Услуга</div>
            <div className={s.cell}>Стоимость</div>
            <div className={s.cell}>Пользователь</div>
            <div className={s.cell}>Дата</div>
            <div className={s.cell}>Выполнено</div>
          </div>

          {profiles &&
            profiles.map((elem, index) =>
              <div className={s.row} key={index}>
                <div className={s.cell}>{elem.header_info}</div>
                <div className={s.cell}>{elem.cost ? elem.cost : 0} руб.</div>
                <div className={s.cell} onClick={() => navigate(`/user/${elem.id}`)}>{elem.name}</div>
                <div 
  className={s.cell} 
  style={elem.date_to_do && 
         typeof elem.date_to_do === 'string' && 
         elem.date_to_do.trim() !== '' && 
         +elem.date_to_do.slice(3, 5) <= month && 
         +elem.date_to_do.slice(0, 2) <= day 
         ? {background: 'red', color: 'white'} 
         : {}}
>
  {elem.date_to_do}
</div>
                <div className={s.cell}><input type="checkbox" checked={elem.done} onChange={() => updateDone(elem)}/></div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default HomePage