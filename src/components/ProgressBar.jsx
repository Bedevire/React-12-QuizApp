export default function ProgressBar({refreshTime, duration}){
    return(
        <progress value={duration} max={duration} />
    )
}