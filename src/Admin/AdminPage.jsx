import React from 'react'
import "@/Admin/styles/admin_nav.css"
import AdminSidebar from './components/AdminSidebar'
import AddProjectPage from './components/AddProjectPage'
import AddGalleryPage from './components/AddGalleryPage'
import ManageProject from './components/ManageProject'

function AdminPage(props) {
  return (
    <main>
        <AdminSidebar active={props.menu}/>
        <div className="admin-main-content">
            {(props.menu == "AddProject")?<AddProjectPage menu={props.menu}/>:null}
            {(props.menu == "AddGallery")?<AddGalleryPage menu={props.menu}/>:null}
            {(props.menu == "ManageProject")?<ManageProject menu={props.menu}/>:null}
        </div>
        
    </main>

  )
}

export default AdminPage