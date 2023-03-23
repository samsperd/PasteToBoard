import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";

const ListContent = ({ contentId, displayContent, updatingDisplay }) => {
  
  const [previewData, setPreviewData] = useState('')
  const [tabItems, setTabItems] = useState([])
  // const [counter, setCounter] = useState(0)
  
  const { quill, quillRef } = useQuill();

  console.log(quill);

  

  useEffect(() => {

    chrome.storage.local.get("dataArray", function(items) {    
        
        setTabItems(items.dataArray)
          
        function isPresent(obj) {
          return obj.id === contentId
        }
          
          setPreviewData(items.dataArray.find(isPresent) || '')

          if (quill) {
            quill.clipboard.dangerouslyPasteHTML(items.dataArray.find(isPresent).texts.textWithHtml);
          }          

          console.log(items.dataArray.find(isPresent));
      });

  }, [contentId, quill])


  const handleDelete = () => {

    // setTabItems(tabItems.splice(index, 1))

    // remove the data item from the array and save the updated array to storage
    chrome.runtime.sendMessage({ contentId }, (response) => {
      // 3. Got an asynchronous response with the data from the service worker

      updatingDisplay()

      // console.log('received user data', response);
    });
  //  console.log(tabItems.splice(index, 1));
  }



  return (
    <div
    className={`opacity-100 transition-opacity duration-150 ease-linear px-2 py-[0.35rem]`}
    >
      {
        displayContent ? (
          <>
            <div className="flex gap-4 items-start justify-end">
              <button onClick={handleDelete} className='flex items-center gap-2 font-cursive font-bold rounded px-4 py-1 text-xs capitalize border border-neutral-700 leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-300 hover:text-white focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-800 active:shadow-lg">'>
                <IoCloseOutline className='text-xs text-red-500' />
                Delete
              </button>
            </div>
              {
                previewData !== '' && (
                  <div ref={quillRef} />

                ) 
              }
                      
          </>

        ) : (
          <div>
              Empty
          </div>
        )
      }

    {/* <div style={{ width: 500, height: 300, border: '1px solid black' }}>
      <div ref={quillRef} />
    </div> */}

    {/* <button onClick={() => setCounter(counter + 1)}>Add</button> */}
  </div>

  )
}

export default ListContent