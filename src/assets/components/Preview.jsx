import React, { useEffect, useState } from 'react'
import "../assets/styles/tailwind.css"
import PreviewTab from './PreviewTab'
import ListContent from './ListContent'
import { FaFolder } from "react-icons/fa";

const Preview = () => {

    const [activeTab, setActiveTab] = useState(1)
    const [tabItems, setTabItems] = useState([])

    const toggleTab = (index) => {
        setActiveTab(index)
    }

    const getActiveClass = (index, className) => {
        return activeTab === index ? className : ""
    }

    const classs = "isolate bg-neutral-100 border-transparent"

    // let tabs = []

        // Retrieve the stored data array from chrome storage and display in popup

        useEffect(() => {
          //
        
            chrome.storage.local.get("dataArray", function(items) {            
                
                setTabItems(items.dataArray || [])
            });
    
        }, [])

    console.log(tabItems);

  return (
    <>
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
                        <PreviewTab key={i} title={tabItem.hostname} classs={getActiveClass(i+1, classs)} action={() => toggleTab(i+1)}>
                            { tabItem.text }
                        </PreviewTab>
                    ))
                }

            </div>
        </ul>
        <div className="flex-[3]">
            <ListContent classs={getActiveClass(1, "d-block")}>
                Tab 1 Content
            </ListContent>
            <ListContent classs={getActiveClass(2, "d-block")}>
                Tab 2 Content
            </ListContent>
        </div>
    </>
)
}

export default Preview
