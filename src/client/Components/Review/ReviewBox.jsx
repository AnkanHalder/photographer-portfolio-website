import React from 'react';
import { MdStarRate } from 'react-icons/md';

const ReviewBox = ({ reviewData }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<MdStarRate key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <div className="reviewbox p-4 bg-white rounded-xl shadow-2xl md:shadow-none">
      <h1 className="text-xl font-bold">{reviewData.name}</h1>
      <div className="flex">
        {renderStars(reviewData.rate)}
      </div>
      <div className="">
        <p>
            {reviewData.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewBox;
