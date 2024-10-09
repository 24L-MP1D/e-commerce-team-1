import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import {
  deleteComment,
  fetchComments,
  postComment
} from "@/app/services/comment";
import { Edit, Star, Trash } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import EditComment from "@/components/editCommentDialog";

const { jwtDecode } = require("jwt-decode");

interface Review {
  userId: {
    _id: string;
    userName: string;
  };
  comment: string;
  rating: number;
}

const CommentSection = ({ slug }: { slug: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<Review[]>([]);
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("Authorization") || "";
  let total = 0;
  comments.map((comment) => (total += comment.rating));
  const avg = total / comments.length;
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

  const getComments = async () => {
    setComments(await fetchComments(slug));
  };

  const handleSubmitComment = async () => {
    if (commentText.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    await postComment(slug, rating, commentText);

    getComments();

    setCommentText("");
    setRating(0);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="text-sm">
      <EditComment
        open={edit}
        setOpen={() => {
          setEdit(!edit);
        }}
        reset={getComments}
        slug={slug}
      />
      <div className="flex gap-4 mt-5 items-center">
        <div>
          <p className="text-gray-900">Үнэлгээ</p>
          <span className="flex gap-2 items-center">
            <span>{avg}</span>
            <Star className="text-yellow-500" fill={`#eab308`} />
          </span>
        </div>

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
                    className="mb-4 p-4 border border-gray-200 rounded relative"
                  >
                    <p className="font-semibold">{review.userId.userName}</p>
                    <StarRating
                      rating={review.rating}
                      onRatingChange={() => {}}
                    />
                    <p className="mt-2">{review.comment}</p>
                    {token && jwtDecode(token)?.id == review.userId._id && (
                      <div className="absolute right-3 top-4 flex gap-2 z-50">
                        <button
                          onClick={() => {
                            setEdit(!edit);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={async () => {
                            await deleteComment(slug);
                            getComments();
                          }}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    )}
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
{
  /* <div className="flex flex-col gap-6 ">
<p className="text-3xl font-bold">Холбоотой бараа</p>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[21px]">
  {products.map((product) => (
    <div
      key={product._id}
      className="rounded-2xl w-[244px] h-[331px] bg-gray-500"
      style={{
        backgroundImage: `url(${product.thumbnails})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => handleProductChange(product._id)}
    ></div>
  ))}
</div>
</div> */
}
