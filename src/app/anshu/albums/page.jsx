import Nav from "@/client/Pages/Nav"
import Albums from "@/client/Pages/Albums"
import "@/client/styles/myalbums.css"

const page = () => {
  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden">
      <Nav />
      <div className="mt-16 bg-black">
        <Albums />
      </div>
    </div>
  )
}

export default page