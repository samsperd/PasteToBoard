import React from 'react'
import "../assets/styles/tailwind.css"

const PreviewTab = ({ title, action, classs, text }) => {
  return (
    <li className={`text-justify px-5 cursor-pointer text-[#282828] border-x-0 border-t-0 border pt-2 pb-1.5 text-xs font-medium leading-tight ${classs}`} onClick={action}>
    <span
      className="my-2 block text-blue-500"
      >{ title }</span>
      <div className='overflow-ellipsis overflow-hidden whitespace-pre-wrap multiline-ellipsis'>
        { text }
      </div>
  </li>
  )
}

export default PreviewTab