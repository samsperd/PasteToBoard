import React from 'react'

const ListContent = ({ children, classs }) => {
  return (
    <div
    className={`hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block ${classs}`}
    >
    { children }
  </div>

  )
}

export default ListContent