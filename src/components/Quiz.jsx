import { useState, useCallback } from 'react'
import QuestionTimer from './QuestionTimer'
import QUESTIONS from '../questions.js'
import quiz_complete from '../assets/quiz-complete.png'

const QUESTIONS_shuffles = QUESTIONS.sort(() => 1); //Math.random() - 0.5);
console.log(QUESTIONS_shuffles);

export default function Quiz(){
    const [appState, setAppState] = useState({
        activeQuestionIndex: 0,
        answers: []
    });
    
    const quizFinished = appState.activeQuestionIndex < 0.
    const question = !quizFinished ? QUESTIONS_shuffles[appState.activeQuestionIndex] : null;

    const questionAnswered = useCallback( function questionAnswered(selectedAnswer){
        console.log('Quiz - You selected: ' + QUESTIONS_shuffles[appState.activeQuestionIndex].id + ' - ' + selectedAnswer)
        
        setNextQuestion(selectedAnswer);
    });

    const questionTimeout = useCallback(function questionTimeout(){
        console.log('Quiz - Time\'s up, you didnt answer question ' + QUESTIONS_shuffles[appState.activeQuestionIndex].id);
        setNextQuestion('');
    }, [setNextQuestion]);

    function setNextQuestion(selectedAnswer){
        setAppState((previousAppState) => {
            const nextQuestionIndex = previousAppState.activeQuestionIndex < (QUESTIONS_shuffles.length - 1) ? previousAppState.activeQuestionIndex + 1 : -1;
            
            if(nextQuestionIndex >= 0)
                console.log('Quiz - Setting next question: ' + QUESTIONS_shuffles[nextQuestionIndex].id);
            else
                console.log('Quiz - This was the last question');

            const currentQuestion = QUESTIONS_shuffles[appState.activeQuestionIndex];
            return{
                activeQuestionIndex: nextQuestionIndex, 
                answers: [...previousAppState.answers, {'id': currentQuestion.id, 'text': selectedAnswer}]
            }
        });
    }

    return(
        <div id="quiz">
            <div id="question">
                {!quizFinished && (
                    <>
                        <QuestionTimer 
                            key={question.id} 
                            refreshTime={10} 
                            duration={3000} 
                            onTimeout={questionTimeout} 
                            questionId={question.id} />
                        <h2>{question.text}</h2>
                        <ol id="answers">
                            {question.answers.map((answer, index) => (
                                <li className="answer" key={index}>
                                    <button onClick={() => questionAnswered(answer)}>{answer}</button>
                                </li>
                            ))}
                        </ol>
                    </>
                )}
                {quizFinished && (
                    <>
                        <img src={quiz_complete} alt="Quiz is finished" />
                        <h2>Your Answers</h2>
                        <ol>
                            {appState.answers.map(answer => (
                                <li key={answer.id}>{answer.id} - {answer.text}</li>
                            ))}
                        </ol>
                    </>
                )}
            </div>
        </div>
    )
}