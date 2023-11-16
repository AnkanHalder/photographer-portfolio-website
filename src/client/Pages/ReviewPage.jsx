"use client"
import { ApiCaller } from '@/ApiManager/apiCaller';
import React,{useEffect,useState} from 'react'
import ReviewBox from '../Components/Review/ReviewBox';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import WriteReviewPage from './WriteReviewPage';

const ReviewPage = () => {
  const [review,setReviews] = useState([]);
  const [addReview,setAddReview] = useState(false);
  useEffect(()=>{
    ApiCaller.getReviews().then((reviews)=>setReviews(reviews));
  },[]);
  return (
    <div>
      <div className='p-6 md:px-16 w-full'>
        <h1 className='text-center text-3xl md:text-4xl lg:text-6xl'>Reviews And Testimonials</h1>
        <p className=' text-xl md:text-2xl my-8'>
          Hey there, Shutterbug Enthusiast! Welcome to the Testimonials Page, where the pixels pop and the smiles never stop!📸.
          Your presence makes this digital corner of mine shine brighter than a thousand camera flashes! 🎉 
        </p>
        <p className=' text-xl md:text-2xl '>
          You see, at Anshu's Photography World, we don't just capture moments; we capture the joy, the laughter, and the love that makes life extraordinary.
        </p>
        <p className=' text-xl md:text-2xl hidden md:block my-4'>
          We absolutely adore every single click of the shutter, but what truly sets our hearts aflutter is the love and support from our incredible clients and friends. Your words, your smiles, and your stories inspire us to reach for the stars with every shot we take.

          So, kick back, relax, and prepare to be wowed. Scroll through the love notes, success stories, and "wow" moments shared by some of the most amazing folks you'll ever meet. They trusted us to capture their memories, and we're ecstatic to share the joy with you.

          We value your opinion more than a perfectly timed golden hour shot, and we're always on a mission to keep improving, keep evolving, and keep exceeding your expectations. So, speak your mind, tell it like it is, and let the good vibes flow!
        </p>
        <p className=' text-xl md:text-2xl mt-4 mb-10'>
          Lets Hear it From My Happy Clients who allowed me the honour of capturing their beautiful happy memories in my lens!!! 
        </p>     
        <div className='review-section'>
          <h1 className='text-2xl md:text-4xl font-extrabold'>Hear it From Them.</h1>
        </div>
        <hr className='border-2 border-solid border-black'/>
        <div className='md:m-4 reviews'>
          
              <ResponsiveMasonry
                  columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
              >
                  <Masonry>
                  {review.map((rev)=>
                  <div className='my-4 md:m-4 shadow-2xl md:shadow-none'>
                    <ReviewBox reviewData={rev} />
                  </div>)}
                  </Masonry>
              </ResponsiveMasonry>

        </div>
        <div className='w-full bg-black my-8 py-16 p-4 md:px-24 text-white flex flex-col items-center justify-center text-center gap-4'>
            <p>
              Are You one of our happy satisfied Clients ? I am glad and honoured
              to be a part of your joyous occation. I believe everyone I work with has a unique story to tell.
              Come Share Your Story And Experience with the World.
            </p>
            <button onClick={()=>setAddReview(true)} className="bg-yellow-500 font-bold p-4">Leave A Review</button>
        </div>
        {
          addReview?
          <WriteReviewPage setter={setAddReview}/>
          : null
        }
      </div>
    </div>
  )
}

export default ReviewPage