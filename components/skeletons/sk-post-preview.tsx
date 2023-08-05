const SkPostPreview = () => {
  return (
    <article>
      <div className="w-full p-4 text-left flex flex-col gap-3">
        {/* 프로필 */}
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 shrink-0 rounded-md animate-pulse" />
            <div className="flex flex-col">
              <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
          <div className="text-sm text-gray-400" />
        </section>

        {/* 본문 & 태그 */}
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-60 h-4 bg-gray-200 rounded-md animate-pulse" />
        <div className="w-36 h-4 bg-gray-200 rounded-md animate-pulse" />

        {/* 버튼부 */}
        <div className="flex gap-2 self-end mt-4 text-slate-600">
          <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse" />
          <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </article>
  );
};

export default SkPostPreview;
