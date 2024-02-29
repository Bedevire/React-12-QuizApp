import ProgressBar from './ProgressBar'

export default function Quiz({question, questionAnswered}){
    return(
        <div id="quiz">
            <div id="question">
                <ProgressBar refreshTime={10} duration={3000} />
                <h2>{question.text}</h2>
                <ol id="answers">
                    {question.answers.map((answer, index) => (
                        <li className="answer" key={index}>
                            <button onClick={() => questionAnswered(answer)}>{answer}</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}