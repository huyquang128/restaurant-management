import { useEffect, useState } from 'react';

function TimerIncrease({ orderId, isStopTimer, setMealDuration }) {
    const MAX_SECONDS = 4 * 60 * 60; // 4 tiếng
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (!orderId) return;

        let interval;
        const storageKey = `mealStartTime-${orderId}`;

        let savedStartTime = localStorage.getItem(storageKey);
        if (!savedStartTime) {
            const now = Date.now();
            localStorage.setItem(storageKey, now);
            savedStartTime = now;
        }

        const startTime = parseInt(savedStartTime, 10);

        const updateTimer = () => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            if (elapsed >= MAX_SECONDS) {
                setSeconds(MAX_SECONDS);
                clearInterval(interval);
            } else {
                setSeconds(elapsed);
            }
        };

        updateTimer();

        if (!isStopTimer) {
            interval = setInterval(updateTimer, 1000);
        }

        return () => clearInterval(interval);
    }, [orderId, isStopTimer]);

    // 👉 Chuyển logic format + setMealDuration sang useEffect riêng
    useEffect(() => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const timeFormat = [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0'),
        ].join(':');

        if (setMealDuration) setMealDuration(timeFormat);
    }, [seconds, setMealDuration]);

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0'),
        ].join(':');
    };

    return <div>{formatTime(seconds)}</div>;
}

export default TimerIncrease;
