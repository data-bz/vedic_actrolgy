import React, { useEffect, useState } from 'react'
import s from './FindPage.module.sass'
import Header from '../../components/header/Header'
import Icell from '../../interfaces/Icell'
import { useNavigate } from 'react-router-dom'

function FindPage() {
  const [users, setUsers] = useState()
  const [name, setName] = useState()

  const navigate = useNavigate()
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://db-project.vercel.app/api/profiles');
      let data = await response.json();
      setUsers(data)
      console.log(data)
      }
    getData()
    
  }, [])

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const filterName = () => {
    const user = users.filter((elem) => 
      (elem.username && elem.username.includes(name)) || 
      (elem.name && elem.name.includes(name))
    );
    setUsers(user);
  }
  

  return (
    <div className={s.container}>
      <Header></Header>
        <div className={s.innerContainer}>
            <input onChange={(e) => handleChangeName(e)} type="text" className={s.find} />
            <img onClick={filterName} src="https://www.pngmart.com/files/8/Search-Button-PNG-HD-Quality.png" alt="" />
        </div>
        <div className={s.users}>
          { users &&
            users.map((elem) => 
            <div className={s.user} onClick={() => navigate(`/user/${elem.id}`)}>
              <p>{elem.name}</p>
              <p>{elem.username}</p>
            </div>)
          }
        </div>
    </div>
  )
}

export default FindPage