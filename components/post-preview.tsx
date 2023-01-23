import Profile from "./profile";

const PostPreview = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-3">
      <Profile />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae aliquam
        soluta quas reiciendis saepe corporis dolorem veritatis architecto
        repellat ullam quo pariatur, voluptate nulla tempore libero beatae,
        rerum modi a assumenda fugit molestiae.
      </p>
      <p className="text-xs text-slate-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
        voluptatum vitae cupiditate. Iste delectus autem ex maxime doloremque
        voluptatum recusandae?
      </p>
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
          <p className="text-sm">2</p>
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
          <p className="text-sm">9</p>
        </button>
      </div>
    </div>
  );
};

export default PostPreview;
