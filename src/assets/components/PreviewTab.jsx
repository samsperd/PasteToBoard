import React from 'react'
import "../assets/styles/tailwind.css"

const PreviewTab = ({ children, title, action, classs }) => {
  return (
    <li role="presentation" className={`text-justify px-5 cursor-pointer text-[#282828] border-x-0 border-t-0 border-b-2 border-transparent pt-2 pb-1.5 text-xs font-medium leading-tight ${classs}`} onClick={action}>
    <span
      className="my-2 block text-blue-500"
      >{ title }</span>
      <div className='overflow-ellipsis'>
        { children }
      </div>
  </li>
  )
}

export default PreviewTab