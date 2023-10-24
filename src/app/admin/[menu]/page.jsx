import AdminPage from "@/Admin/AdminPage"

function page(props) {
  return (
    <div className="h-screen w-screen bg-white text-black">
        <AdminPage menu={props.params.menu}/>
    </div>
  )
}

export default page