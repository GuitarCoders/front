const SkComment = () => {
  return (
    <div className="p-4 flex gap-4 align-start border-b">
      <div className="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 animate-pulse" />
      <div className="flex flex-col text-sm gap-1 justify-center w-full">
        <div className="w-8 h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-44 h-4 bg-gray-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default SkComment;
