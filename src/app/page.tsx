import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[#4F4440] text-[#E8F2AD]">
      <div className="max-w-xl w-full rounded-2xl border border-[#655954] bg-[#3E3532]/70 p-10 shadow-2xl backdrop-blur">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#E8F2AD] text-center leading-snug">
          안녕하세요 친구야,
          <br />
          <span className="text-[#8DF68D] underline decoration-[#8DF68D]/50 decoration-wavy">warren</span>입니다
        </h1>

        <div className="mt-8 flex justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[#655954] shadow-xl">
            <img
              src="/screen.jpg"
              alt="Screen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-base font-mono text-[#8DF68D] bg-[#342B28] border border-[#655954] rounded-xl px-4 py-3">
          <span className="inline-block w-3 h-3 rounded-full bg-[#8DF68D] animate-pulse" />
          Ready at <span className="font-bold text-[#8DF68D]">localhost:3000</span>
        </div>

        <p className="mt-6 text-center text-[#C84726]">
          [오늘 처음 인터넷에 사이트를 올렸어요!]
        </p>

        <div className="mt-8 pt-6 border-t border-[#655954]/60">
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold bg-[#8DF68D] text-[#342B28] hover:bg-[#a3f7a3] hover:shadow-lg transition-all duration-200 active:scale-[0.99] text-center"
          >
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">✉️</span>
            <span>문의사항 남기기</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

