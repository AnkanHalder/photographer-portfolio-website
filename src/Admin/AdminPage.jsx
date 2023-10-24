import React from 'react'
import "@/Admin/styles/admin_nav.css"
import AdminSidebar from './components/AdminSidebar'
import AddProjectPage from './components/AddProjectPage'

function AdminPage(props) {
  return (
    <main>
        <AdminSidebar/>
        <div className="admin-main-content">
            {(props.menu == "AddProject")?<AddProjectPage menu={props.menu}/>:null}
        </div>
        
    </main>

  )
}

export default AdminPage