"use client"
import React from 'react'
import { MdCreateNewFolder,MdEditDocument, } from 'react-icons/md'

function AdminSidebar(props) {
  return (
    <div className='nav'>
        <div className='nav-logo'>
            Anshu
        </div>
        <ul className='nav-items'>
            <li 
                onClick = {()=>props.setActive(1)}
                className={"py-4 cursor-pointer " + ((props.active!="1")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">ADD PROJECT</h1>
                </div>
            </li>
            <li 
                onClick = {()=>props.setActive(2)}
                className={"py-4 cursor-pointer " + ((props.active!="2")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between'>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdEditDocument/></div>
                    <h1 className="nav-text text-left w-full">MANAGE PROJECTS</h1>
                </div>
            </li>
            <li 
                onClick = {()=>props.setActive(3)}
                className={"py-4 cursor-pointer " + ((props.active!="3")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between'>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">PICTURES</h1>
                </div>
            </li>
            <li 
                onClick = {()=>props.setActive(4)}
                className={"py-4 cursor-pointer " + ((props.active!="4")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">Page SETTINGS</h1>
                </div>
            </li>
            <li 
                onClick = {()=>props.setActive(5)}
                className={"py-4 cursor-pointer " + ((props.active!="5")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">Profile SETTINGS</h1>
                </div>
            </li>
            <li 
                onClick = {()=>props.setActive(6)}
                className={"py-4 cursor-pointer " + ((props.active!="6")?"nav-item" : "nav-item-active")}>
                <div className='flex items-center justify-between '>
                    <div style={{paddingLeft: "0.8rem" ,width:"4rem",fontSize:"1.5rem"}}><MdCreateNewFolder/></div>
                    <h1 className="nav-text text-left w-full">Profile SETTINGS</h1>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default AdminSidebar