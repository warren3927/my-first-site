import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "이메일 전송 설정이 올바르지 않습니다. (API Key 누락)" },
        { status: 500 }
      );
    }

    const { name, email, category, title, message } = await request.json();

    if (!name || !email || !title || !message) {
      return NextResponse.json(
        { error: "모든 필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "jsgodv@gmail.com";

    const categoryLabels: Record<string, string> = {
      general: "일반 문의",
      feedback: "사이트 피드백 & 개선 제안",
      collaboration: "협업 및 커피챗 제안",
      other: "기타",
    };

    const categoryText = categoryLabels[category] || category || "기타";

    // Resend를 통해 이메일 발송
    const data = await resend.emails.send({
      from: `사이트 문의 알림 <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[웹사이트 문의] ${title} (${name}님)`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
          <h2 style="color: #2b6cb0; margin-top: 0; border-bottom: 2px solid #ebf8ff; padding-bottom: 12px;">
            📬 새로운 웹사이트 문의사항이 도착했습니다
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; width: 110px; font-weight: bold; color: #4a5568;">보낸 사람</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">답변 이메일</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">
                <a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">문의 유형</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; color: #2d3748;">
                <span style="background-color: #e2e8f0; padding: 3px 8px; border-radius: 6px; font-size: 13px;">${categoryText}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">제목</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #1a202c;">${title}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="font-weight: bold; color: #4a5568; margin-bottom: 8px;">문의 내용:</p>
            <div style="background-color: #f7fafc; padding: 16px; border-radius: 8px; border: 1px solid #edf2f7; white-space: pre-wrap; line-height: 1.6; color: #2d3748;">
${message}
            </div>
          </div>

          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0; text-align: center;">
            본 메일은 my-first-site 문의사항 페이지를 통해 자동으로 발송되었습니다.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("이메일 발송 실패:", error);
    return NextResponse.json(
      { error: "이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
