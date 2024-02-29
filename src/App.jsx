import { useState } from 'react'
import Header from './components/Header'
import Quiz from './components/Quiz'
import questions from './questions.js'

function App() {
    
    const [appState, setAppState] = useState({
        activeQuestionIndex: 0,
        answers: []
    });

    function questionAnswered(selectedAnswer){
        console.log('You selected: ' + selectedAnswer)
        setAppState((previousAppState) => {
            const nextQuestionIndex = previousAppState.activeQuestionIndex < (questions.length - 1) ? previousAppState.activeQuestionIndex + 1 : 0;

            return{
                activeQuestionIndex: nextQuestionIndex, 
                answers: [...previousAppState.answers, selectedAnswer]
            }            
        });
        console.log('Answers: ' + appState.answers);
    }

    return(
        <>
            <Header />
            <Quiz question={questions[appState.activeQuestionIndex]} questionAnswered={questionAnswered} ></Quiz>
            <ol>
                {questions.map((question) => (
                    <li key={question.id}>
                        <p>{question.text}</p>

                    </li>
                ))}
            </ol>
        </>
    )
}

export default App;
