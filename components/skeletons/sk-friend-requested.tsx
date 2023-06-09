const SkFriendRequested = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0 animate-pulse" />
          <div className="flex flex-col justify-center gap-2">
            <div className="bg-gray-200 w-24 h-5 rounded-md animate-pulse" />
            <div className="bg-gray-200 w-16 h-4 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-gray-200 w-16 h-8 animate-pulse rounded-md" />
        </div>
      </div>
      <div className="text-sm mt-4 p-4 bg-gray-100 rounded-md gap-2 flex flex-col">
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-1/2 h-4 bg-gray-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default SkFriendRequested;
