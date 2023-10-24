import Image from "next/image";

const Plane = (props) => {
  return (
    <div className={"absolute h-screen w-screen image-container border-2 border-solid overflow-hidden plane" + 
      props.planeNumber}>
      <div className="img1  absolute">
        <img src={props.images[0]}/>
      </div>
      <div className="img2  absolute">
        <img src={props.images[1]}/>
      </div>
      <div className="img3 absolute">
        <img src={props.images[2]} />
      </div>
    </div>
  );
};

export default Plane;
