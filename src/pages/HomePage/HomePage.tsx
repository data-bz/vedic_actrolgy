import React, { useEffect, useState } from 'react'
import s from './HomePage.module.sass'
import { Icell } from '../../interfaces/Icell'



function HomePage() {

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://db-project.vercel.app/api/profiles');
      const data = await response.json();
      setProfiles(data)
      // let sum = 0
      // for(let i = 0; i < data.length; i++){
      //   sum += 
      // }
    }
    getData()
  }, [])

  const [profiles, setProfiles] = useState<Icell[]>()
  const [sum, setSum] = useState<number>(0)
  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        <div className={s.topBlock}>
          <div className={s.block}>
            <div className={s.title}>Общая выручка</div>
            <div className={s.value}>{sum}</div>
          </div>
          <div className={s.block}>
            <div className={s.title}>Всего заказов</div>
            <div className={s.value}>{profiles?.length}</div>
          </div>
          <div className={s.block}>
            <div className={s.title}>Пользователей</div>
            <div className={s.value}>{profiles?.length}</div>
          </div>
        </div>

        <div className={s.bottomBlock}>

          <div className={s.titles}>
            <div className={s.cell}>Услуга</div>
            <div className={s.cell}>Стоимость <img src="/images/Polygon 1.png" alt="" /></div>
            <div className={s.cell}>Пользователь</div>
            <div className={s.cell}>Дата <img src="/images/Polygon 2.png" alt="" /></div>
          </div>

          {profiles &&
            profiles.map((elem, index) =>
              <div className={s.row} key={index}>
                <div className={s.cell}>{elem.service}Название</div>
                <div className={s.cell}>{elem.price}5000 руб.</div>
                <div className={s.cell}>{elem.name}</div>
                <div className={s.cell}>{elem.birth_data}</div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default HomePage