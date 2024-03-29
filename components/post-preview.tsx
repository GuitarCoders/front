import { timeDifference } from "@libs/time-difference";
import { User } from "hooks/useUser";
import { NextPage } from "next";
import Link from "next/link";

interface PostPreviewProps {
  author: User;
  content: string;
  tags: string;
  createdAt: string;
  postId: string;
}

const PostPreview: NextPage<PostPreviewProps> = ({
  author,
  content,
  tags,
  createdAt,
  postId,
}) => {
  const postTime = new Date(createdAt).getTime();
  const now = Date.now();
  return (
    <Link href={`/posts/${postId}`}>
      <div className="w-full p-4 text-left flex flex-col gap-3">
        {/* 프로필 */}
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 shrink-0 rounded-md" />
            <div className="flex flex-col">
              <h2 className="font-semibold text-sm">{author.name}</h2>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            {timeDifference(now, postTime)}
          </p>
        </section>

        {/* 본문 & 태그 */}
        <p className="text-sm">{content}</p>
        <p className="text-sm text-gray-400 font-light">{tags}</p>

        {/* 버튼부 */}
        <div className="flex gap-2 self-end mt-4 text-slate-600">
          <button className="flex items-center gap-1 border py-1 px-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
            <p className="text-sm">0</p>
          </button>
          <button className="flex items-center gap-1 border py-1 px-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <p className="text-sm">0</p>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostPreview;
