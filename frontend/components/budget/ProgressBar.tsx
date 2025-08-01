"use client"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
export default function ProgressBar({percentage}: {percentage: number}) {
    return (
        <>
            <div className='flex justify-center p-10'>
                <CircularProgressbar 
                styles={buildStyles({
                    pathColor: '#f9ab0f',
                    textColor: '#f9ab0d',
                    trailColor: '#e1e1e1',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                })}
                text={`${percentage}% `} 
                value={percentage}
                />

            </div>


        </>
    )
}