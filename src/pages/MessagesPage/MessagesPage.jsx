import React, { useEffect, useRef, useState } from 'react';
import s from './MessagesPage.module.sass';
import Header from '../../components/header/Header';

function MessagesPage() {
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState(null);
    const [users, setUsers] = useState([]);
    const photoRef = useRef();

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleChangePhoto = (e) => {
        setPhoto(e.target.files[0]);
    };

    useEffect(() => {
        fetch('https://db-project.vercel.app/api/users')
            .then((data) => data.json())
            .then(resp => setUsers(resp));
    }, []);

    const sendMessage = async (category) => {
        let filtered;
        const botToken = '6886731232:AAEs9WhqgO8FJBZmr18MIPr5LPBsfAtzyiU';

        // Фильтрация пользователей по выбранной категории
        if (category === "online_broadcast") {
            filtered = users.filter((elem) => elem.online_broadcast === true);
        } else if (category === "horoscope") {
            filtered = users.filter((elem) => elem.horoscope === true);
        } else if (category === "video") {
            filtered = users.filter((elem) => elem.video === true);
        } else if (category === "articles") {
            filtered = users.filter((elem) => elem.articles === true);
        }

        // Отправка сообщений каждому отфильтрованному пользователю
        if(filtered.length == 0){
            alert("Сообщение отправлено")
        }
        console.log(filtered);
        
        for (const user of filtered) {
            const url = photo
                ? `https://api.telegram.org/bot${botToken}/sendPhoto`
                : `https://api.telegram.org/bot${botToken}/sendMessage`;

            const formData = new FormData();
            formData.append('chat_id', user.id);

            if (photo) {
                formData.append('photo', photo);
                if (message) {
                    formData.append('caption', message);
                }
            } else {
                formData.append('text', message);
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert(`Сообщение отправлено`);
                } else {
                    console.error(`Failed to send message to user ${user.id}`);
                }
            } catch (error) {
                console.error(`Error sending message to user ${user.id}:`, error);
            }
        }
    };

    return (
        <div className={s.container}>
            <Header />
            <div className={s.innerContainer}>
                <textarea
                    placeholder="Введите сообщение"
                    onChange={(e) => handleChangeMessage(e)}
                    value={message}
                ></textarea>
                <input
                    type="file"
                    onChange={(e) => handleChangePhoto(e)}
                    hidden={true}
                    ref={photoRef}
                />

                <button className={s.inputBtn} onClick={() => photoRef.current.click()}>
                    Загрузить изображение
                </button>
                <div className={s.buttonsTop}>
                    <button onClick={() => sendMessage("online_broadcast")}>Онлайн Эфир</button>
                    <button onClick={() => sendMessage("horoscope")}>Гороскоп на неделю</button>
                </div>

                <div className={s.buttonsBottom}>
                    <button onClick={() => sendMessage("video")}>Видео от астролога</button>
                    <button onClick={() => sendMessage("articles")}>Обучающие статьи</button>
                </div>
            </div>
        </div>
    );
}

export default MessagesPage;
