import { useState, useCallback } from 'react'
import QuestionTimer from './QuestionTimer'
import QUESTIONS from '../questions.js'
import quiz_complete from '../assets/quiz-complete.png'

const QUESTIONS_shuffles = QUESTIONS.sort(() => Math.random() - 0.5);
console.log(QUESTIONS_shuffles);

export default function Quiz(){

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');    

    const quizFinished = activeQuestionIndex < 0.
    const question = !quizFinished ? QUESTIONS_shuffles[activeQuestionIndex] : null;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        
        const currentQuestion = QUESTIONS_shuffles[activeQuestionIndex];
        
        setAnswerState('answered');
        setAnswers(previousAnswers => {
             return [...previousAnswers, {'id': currentQuestion.id, 'text': selectedAnswer}]
        })

        //setTimeout(() => {
            if ( selectedAnswer === currentQuestion.answers[0]){
                setAnswerState('correct');
            }
            else{
                setAnswerState('wrong');
            }

            setTimeout(() => {
                const nextQuestionIndex = activeQuestionIndex < (QUESTIONS_shuffles.length - 1) ? activeQuestionIndex + 1 : -1;
                setActiveQuestionIndex(nextQuestionIndex);
                setAnswerState('');
            }, 2000);
        //}, 1000)
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(''), [handleSelectAnswer]);

    return(
        <div id="quiz">
            <div id="question">
                {!quizFinished && (
                    <>
                        <QuestionTimer 
                            key={question.id} 
                            refreshTime={10} 
                            duration={3000} 
                            onTimeout={handleSkipAnswer} 
                            questionId={question.id} />
                        <h2>{question.text}</h2>
                        <ol id="answers">

                            {question.answers.map((answer, index) => {
                                let className = '';
                                if(answerState === 'correct')
                                    className = 'correct'
                                else if(answerState === 'wrong')
                                    className = 'wrong'
                                else if(answerState === 'answered')
                                    className = ''

                                return (
                                    <li className="answer" key={index}>
                                        <button className={className} onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                                    </li>
                                )
                            })}
                        </ol>
                    </>
                )}
                {quizFinished && (
                    <>
                        <img src={quiz_complete} alt="Quiz is finished" />
                        <h2>Your Answers</h2>
                        <ol>
                            {answers.map(answer => (
                                <li key={answer.id}>{answer.id} - {answer.text}</li>
                            ))}
                        </ol>
                    </>
                )}
            </div>
        </div>
    )
}