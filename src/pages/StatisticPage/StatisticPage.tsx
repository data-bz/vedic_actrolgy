import React, { useEffect } from 'react'
import s from './StatisticPage.module.sass'
import { useState } from 'react'
import { Icell } from '../../interfaces/Icell'
import Header from '../../components/header/Header'

function StatisticPage() {

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://db-project.vercel.app/api/profiles');
            const data = await response.json();
            setProfiles(data)
            console.log(data);
            
            let sum = 0
            for(let i = 0; i < data.length; i++){
              sum += +data[i].cost
            }
            setSum(sum)
            
        }
        getData()

    }, [])

    const [sum, setSum] = useState<number>(0)
    const [profiles, setProfiles] = useState<Icell[]>()

    return (
        <div className={s.container}>
            <Header/>
            <div className={s.innerContainer}>

            <div className={s.topBlock}>
                <div className={s.block}>
                    <div className={s.title}>Общая выручка</div>
                    <div className={s.value}>{sum} руб.</div>
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
            </div>

        </div>
    )
}

export default StatisticPage