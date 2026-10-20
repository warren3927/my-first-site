"use client";

import { useState } from "react";
import Link from "next/link";

interface InquiryForm {
  name: string;
  email: string;
  category: string;
  title: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    email: "",
    category: "general",
    title: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "이메일 전송에 실패했습니다.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      category: "general",
      title: "",
      message: "",
    });
    setErrorMessage(null);
    setIsSubmitted(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-[#4F4440] text-[#E8F2AD]">
      <div className="max-w-xl w-full rounded-2xl border border-[#655954] bg-[#3E3532]/80 p-6 sm:p-10 shadow-2xl backdrop-blur my-8">
        {/* 상단 네비게이션 & 헤더 */}
        <div className="flex items-center justify-between mb-6 border-b border-[#655954] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8DF68D] hover:underline"
          >
            ← 메인페이지로 돌아가기
          </Link>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#342B28] text-[#8DF68D] border border-[#655954]">
            Contact Us
          </span>
        </div>

        {isSubmitted ? (
          /* 제출 완료 안내 카드 */
          <div className="py-8 text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#8DF68D]/20 border-2 border-[#8DF68D] flex items-center justify-center text-3xl">
              ✓
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8F2AD] mb-2">
              문의가 성공적으로 전달되었습니다!
            </h2>
            <p className="text-sm text-[#C84726] font-medium mb-6">
              남겨주신 소중한 의견을 확인 후 빠르게 연락드리겠습니다.
            </p>

            {/* 입력했던 내용 요약 */}
            <div className="text-left bg-[#342B28] border border-[#655954] rounded-xl p-4 mb-6 text-sm space-y-2">
              <div className="flex">
                <span className="w-20 text-[#8DF68D] font-mono">보낸 사람</span>
                <span className="text-[#E8F2AD]">{formData.name} ({formData.email})</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#8DF68D] font-mono">문의 제목</span>
                <span className="text-[#E8F2AD]">{formData.title}</span>
              </div>
              <div className="flex items-start">
                <span className="w-20 text-[#8DF68D] font-mono shrink-0">내용</span>
                <span className="text-[#E8F2AD]/90 line-clamp-2">{formData.message}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-[#655954] text-[#E8F2AD] hover:bg-[#342B28] font-medium transition-colors"
              >
                다른 문의사항 남기기
              </button>
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-[#8DF68D] text-[#342B28] font-bold hover:bg-[#a3f7a3] transition-colors text-center shadow-md"
              >
                메인으로 이동
              </Link>
            </div>
          </div>
        ) : (
          /* 문의 작성 폼 */
          <div>
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E8F2AD] tracking-tight">
                문의사항 남기기
              </h1>
              <p className="mt-2 text-sm text-[#E8F2AD]/70">
                궁금한 점이나 피드백, 응원의 메시지를 자유롭게 남겨주세요!
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-[#C84726]/20 border border-[#C84726] text-[#E8F2AD] text-sm flex items-start gap-2.5">
                <span className="text-[#C84726] font-bold">⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 작성자 이름 */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#8DF68D] mb-1.5"
                  >
                    이름 / 닉네임 <span className="text-[#C84726]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full bg-[#342B28] border border-[#655954] text-[#E8F2AD] placeholder-[#9E9089] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8DF68D] focus:ring-1 focus:ring-[#8DF68D] transition-colors"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#8DF68D] mb-1.5"
                  >
                    답변받을 이메일 <span className="text-[#C84726]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full bg-[#342B28] border border-[#655954] text-[#E8F2AD] placeholder-[#9E9089] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8DF68D] focus:ring-1 focus:ring-[#8DF68D] transition-colors"
                  />
                </div>
              </div>

              {/* 문의 유형 */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-mono uppercase tracking-wider text-[#8DF68D] mb-1.5"
                >
                  문의 유형
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-[#342B28] border border-[#655954] text-[#E8F2AD] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8DF68D] focus:ring-1 focus:ring-[#8DF68D] transition-colors cursor-pointer"
                >
                  <option value="general" className="bg-[#342B28] text-[#E8F2AD]">
                    일반 문의
                  </option>
                  <option value="feedback" className="bg-[#342B28] text-[#E8F2AD]">
                    사이트 피드백 & 개선 제안
                  </option>
                  <option value="collaboration" className="bg-[#342B28] text-[#E8F2AD]">
                    협업 및 커피챗 제안
                  </option>
                  <option value="other" className="bg-[#342B28] text-[#E8F2AD]">
                    기타
                  </option>
                </select>
              </div>

              {/* 문의 제목 */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-mono uppercase tracking-wider text-[#8DF68D] mb-1.5"
                >
                  제목 <span className="text-[#C84726]">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="문의하실 내용의 핵심을 적어주세요"
                  className="w-full bg-[#342B28] border border-[#655954] text-[#E8F2AD] placeholder-[#9E9089] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8DF68D] focus:ring-1 focus:ring-[#8DF68D] transition-colors"
                />
              </div>

              {/* 문의 내용 */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-[#8DF68D] mb-1.5"
                >
                  문의 내용 <span className="text-[#C84726]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="자세한 문의 내용을 작성해 주세요..."
                  className="w-full bg-[#342B28] border border-[#655954] text-[#E8F2AD] placeholder-[#9E9089] rounded-xl p-4 text-sm focus:outline-none focus:border-[#8DF68D] focus:ring-1 focus:ring-[#8DF68D] transition-colors resize-none"
                />
              </div>

              {/* 전송 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 px-6 rounded-xl font-bold bg-[#8DF68D] text-[#342B28] hover:bg-[#a3f7a3] active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-[#342B28] border-t-transparent rounded-full animate-spin" />
                    전송 중입니다...
                  </>
                ) : (
                  <>
                    <span>✉️</span> 문의사항 보내기
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
