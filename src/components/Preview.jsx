import React, { useEffect, useState } from 'react'
import "../assets/styles/tailwind.css"
import PreviewTab from './PreviewTab'
import ListContent from './ListContent'
import { FaFolder } from "react-icons/fa";

const Preview = () => {

    const [activeTab, setActiveTab] = useState(0)
    const [tabItems, setTabItems] = useState([])
    const [displayContent, setdisplayContent] = useState(false)
    const [updateDisplay, setUpdateDisplay] = useState(true)

    // Retrieve the stored data array from chrome storage and display in popup

    useEffect(() => {
        //
        
            chrome.storage.local.get("dataArray", function(items) { 

                console.log("items",items);

                if (items.dataArray.length > 0) {
                    setActiveTab(items.dataArray[0].id)
                    
                    setTabItems(items.dataArray)
                    
                    setdisplayContent(true)

                    setUpdateDisplay(false)
                } else {
                    setTabItems([])
                    setActiveTab(0)
                    setdisplayContent(false)
                    setUpdateDisplay(true)
                }
                
            });
    
        }, [updateDisplay])
      

    const toggleTab = (index) => {
        // console.log(index);
        setActiveTab(index)
    }

    const getActiveClass = (index, className) => {
        return activeTab === index ? className : ""
    }

    const classs = "isolate bg-neutral-100 border-transparent"

    const updatingDisplay = () => {
        setUpdateDisplay(true)
    }
    


    // let tabs = []


  return (
    <>
        {
            displayContent && (
                <ul
                className=" flex-wrap pl-0 flex-[2] h-full border border-y-0 border-[rgba(184, 184, 184, 0.5)] overflow-hidden"
                role="tablist"
                data-te-nav-ref>
                    <div className="pt-3 pb-2.5 border border-x-0 border-t-0 border-b-[1] flex items-center justify-center gap-4 w-full">
                        <span className='flex-[3] px-5 text-justify font-bold'>
                            List
                        </span>
                        <span className='flex-1'>
                            <FaFolder />
                        </span>
                    </div>
                    <div className='overflow-y-scroll w-full h-full m-0 flex list-none flex-col'>
                        {
                            tabItems.map((tabItem, i) => (
                                <PreviewTab key={i} title={tabItem.hostname} text={ tabItem.texts.text } classs={getActiveClass(tabItem.id, classs)} action={() => toggleTab(tabItem.id)} />
                            ))
                        }

                    </div>
                </ul>

            )
        }
        <div className="flex-[3]">
            <ListContent contentId={activeTab} displayContent={displayContent} updatingDisplay={updatingDisplay} />
            {/* <ListContent classs={getActiveClass(1, "d-block")}>
                Tab 2 Content
            </ListContent> */}
        </div>
    </>
)
}

export default Preview
