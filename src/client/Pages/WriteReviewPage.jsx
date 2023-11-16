"use client"
import {useState} from 'react'
import "@/client/styles/review.css"
import { ApiCaller } from '@/ApiManager/apiCaller'


const WriteReviewPage = (props) => {
    const [reviewInputState, setReviewInputState] = useState({
        name: "",
        email: "",
        rate: 5,
        review:""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewInputState((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = await ApiCaller.addReview(reviewInputState);
        props.setter(false);
        console.log("Dara sent. Received:",data);
    }
    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center bg-transparent fixed top-0 left-0 z-[500]'>
            <form className='writeReview text-white relative '>
                <div onClick={()=>props.setter(false)} className='cross cursor-pointer absolute top-0 right-0 text-2xl p-4'>
                    X
                </div>
                <div className='writeReviewForm-form p-8 flex flex-col justify-around text-yellow-500'>
                    <h1 className='text-3xl text-center'>Review Us</h1>
                    <hr/>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name'>Name:</label>
                        <input name="name" type='text' className='bg-transparent text-white border-b-2 border-solid border-white
                                active:border-yellow-500 focus:border-yellow-500 outline-none' 
                                placeholder='Enter Your Name'
                                required
                                value={reviewInputState.name}
                                onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email:</label>
                        <input name="email" required type='email' className='bg-transparent text-white border-b-2 border-solid border-white
                                active:border-yellow-500 focus:border-yellow-500 outline-none' 
                                placeholder='Enter Your Email' 
                                value={reviewInputState.email}
                                onChange={handleInputChange} />
                    </div>      
                    <div className='flex gap-2 items-center'>
                        <p>{"Rate (out of 5) : "}</p>
                        <select name="rate" className='text-black' value={reviewInputState.rate}
                                onChange={handleInputChange}>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                </div>
                <div className='writeReview-review m-4 py-5 flex flex-col items-center justify-center'>
                    <textarea className='bg-transparent rounded-lg w-full h-full md:h-3/4 p-4' 
                        name="review" 
                        required
                        placeholder='Tell Us Your Experience' value={reviewInputState.review}
                                onChange={handleInputChange}/>
                    <div className='w-3/4 bottom-0 top-full mt-8 mx-auto'>
                        <button onClick={handleSubmit} className='w-full p-4 font-bold text-white bg-yellow-500'>Leave A Review</button>
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default WriteReviewPage