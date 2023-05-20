import { NextPage } from "next";

interface CommentProps {
  avatar?: string;
  username: string;
  comment: string;
}

const Comment: NextPage<CommentProps> = ({ username, comment }) => {
  return (
    <div className="p-4 flex gap-4 align-start border-b">
      <div className="w-10 h-10 rounded-md bg-gray-300 flex-shrink-0" />
      <div className="flex flex-col text-sm gap-1">
        <h5 className="font-semibold">{username}</h5>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
