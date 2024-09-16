import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

const CommentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Review[]>([]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    const newComment: Review = {
      reviewer: "Current User",
      comment: commentText,
      rating: rating,
    };

    setComments([newComment, ...comments]);

    setCommentText("");
    setRating(0);
  };

  return (
    <div className="relative text-sm">
      <div className="flex gap-4 mt-5">
        <p className="text-gray-900">Үнэлгээ</p>
        <button onClick={toggleVisibility} className="text-blue-600 underline">
          {isVisible ? "бүгдийг хураах" : "бүгдийг харах"}
        </button>
      </div>
      {isVisible && (
        <div className="mt-4 p-6 border border-gray-300 rounded-2xl bg-gray-100 shadow-md">
          <div className="mb-4">
            <p>Одоор үнэлэх:</p>
            {comments.length > 0 ? (
              <div className="mt-4">
                {comments.map((review, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-gray-200 rounded"
                  >
                    <p className="font-semibold">{review.reviewer}</p>
                    <StarRating
                      rating={review.rating}
                      onRatingChange={() => {}}
                    />
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Үнэлгээ байхгүй байна.</p>
            )}
          </div>

          <div>
            <p>Сэтгэгдэл үлдээх:</p>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Write a comment..."
              value={commentText}
              onChange={handleCommentChange}
            ></textarea>
            <Button
              variant="outline"
              className="rounded-full px-9 py-2 text-white bg-blue-600 text-sm mt-2"
              onClick={handleSubmitComment}
            >
              Үнэлэх
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
