import React, { useState } from 'react';

const RatingSystem: React.FC = () => {
  const [rating, setRating] = useState<GLfloat>(0);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value); // Convert the value to a floating-point number
    setRating(value);
    console.log(value);
  };

  return (
    <div className="rating">
      {[...Array(5).keys()].map((index) => (
        <input
          key={index}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-primary-500"
          value={index + 1}
          checked={rating === index + 1}
          onChange={handleRatingChange}
        />
      ))}
    </div>
  );
};

export default RatingSystem;
