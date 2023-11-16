"use client"
import React from 'react'
import { MdCreateNewFolder} from 'react-icons/md'

function AdminSidebar(props) {
  return (
    <div className='nav'>
        <div className='nav-logo'>
            Anshu
        </div>
        <ul className='nav-items'>
            <li
                className={"py-4 cursor-pointer " + ((props.active!="AddProject")?"nav-item" : "nav-item-active")}>
                <a href="/admin/AddProject" className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">ADD PROJECT</h1>
                </a>
            </li>
            <li
                className={"py-4 cursor-pointer " + ((props.active!="ManageProject")?"nav-item" : "nav-item-active")}>
                <a href="/admin/ManageProject" className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">MANAGE PROJECT</h1>
                </a>
            </li>
            <li
                className={"py-4 cursor-pointer " + ((props.active!="AddGallery")?"nav-item" : "nav-item-active")}>
                <a href="/admin/AddGallery" className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">Gallery</h1>
                </a>
            </li>
            <li
                className={"py-4 cursor-pointer " + ((props.active!="Settings")?"nav-item" : "nav-item-active")}>
                <a href="/admin/Settings" className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">Settings</h1>
                </a>
            </li>
            
        </ul>
    </div>
  )
}

export default AdminSidebar