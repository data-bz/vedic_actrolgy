import React, { useEffect, useState } from 'react';
import s from './StatisticPage.module.sass';
import { Icell } from '../../interfaces/Icell';
import Header from '../../components/header/Header';

function StatisticPage() {
    const [sum, setSum] = useState<number>(0);
    const [profiles, setProfiles] = useState<Icell[] | undefined>([]);
    const [message, setMessage] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://db-project.vercel.app/api/profiles');
                const data = await response.json();
                setProfiles(data);
                
                let sum = 0;
                for (let i = 0; i < data.length; i++) {
                    sum += +data[i].cost;
                }
                setSum(sum);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };
        getData();
    }, []);

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (userId: number, message: string) => {
        const botToken = '6886731232:AAEs9WhqgO8FJBZmr18MIPr5LPBsfAtzyiU';
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const data = {
            chat_id: userId,
            text: message
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log(`Message sent to user ${userId}`);
            } else {
                console.error(`Failed to send message to user ${userId}`);
            }
        } catch (error) {
            console.error(`Error sending message to user ${userId}:`, error);
        }
    };

    const sendMessagesToAll = async () => {
        if (!message || !profiles) {
            alert('Message or profiles data is missing!');
            return;
        }

        setSending(true);

        for (const profile of profiles) {
            await sendMessage(profile.user_id, message); // assuming each profile has a userId field
        }

        setSending(false);
        setMessage("")
        alert('Messages sent to all users.');
    };

    return (
        <div className={s.container}>
            <Header />
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
    );
}

export default StatisticPage;
