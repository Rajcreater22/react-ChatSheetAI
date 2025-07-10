import React from 'react'
import Answer from './Answers'

function Qustionanswer({ item, index }) {
    return (
        <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end mt-5' : ''}>
            {
                item.type == 'q' ?
                    <li key={index + Math.random()} className='border-2 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit dark:bg-zinc-700 p-3'>
                        <Answer ans={item.text} totalResult={1} index={index} type={item.type} />
                    </li>
                    : item.text.map((ansItem, ansIndex) => (
                        <li key={index + Math.random()} className='text-left p-1'>
                            <Answer ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type} />
                        </li>
                    ))
            }
        </div>
    )
}

export default Qustionanswer