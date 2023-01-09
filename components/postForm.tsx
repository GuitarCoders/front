const PostForm = () => {
  return (
    <form className="flex flex-col items-end gap-2">
      <textarea
        className="border w-full resize-none rounded-md p-2 focus:ring-violet-400 focus:outline-violet-400"
        rows={3}
      />
      <button className="px-4 py-2 bg-violet-400 text-white rounded-md">
        글쓰기
      </button>
    </form>
  );
};

export default PostForm;
