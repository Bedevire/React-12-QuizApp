import { useEffect, useState } from 'react'

export default function QuestionTimer({refreshTime, duration, onTimeout, questionId}){

    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        console.log('QuestionTimer - seeting up Timeout for question ' + questionId);
        const timeout = setTimeout(() => {
            onTimeout();
        }, duration);

        return () => {
            clearTimeout(timeout);
        }
    }, [questionId]);

    useEffect(() => {
        console.log('QuestionTimer - setting up interval');
        const interval = setInterval(() => {
            setRemainingTime((currentTime) => {
                const newTtime = currentTime - refreshTime;
                //console.log('Question timer: ' + newTtime + ' left' );
                if(newTtime <= 0){
                    console.log('QuestionTimer - Clearing interval for question ' + questionId);
                    clearInterval(interval);                    
                }
                return newTtime;
            });
        }, refreshTime);

        return () => {
            clearInterval(interval);
        }
    }, [questionId]);

    return (
        <progress id="question-time" value={remainingTime} max={duration} />
    )
}