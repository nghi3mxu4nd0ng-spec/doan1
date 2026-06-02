import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { admissionsKnowledgeText } from "@/data/admissions";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
});

const SYSTEM_PROMPT = `Bạn là "Trợ lý Tuyển sinh AI" của Đại học Xuân Đông. Luôn trả lời bằng tiếng Việt, ngắn gọn, thân thiện và chuyên nghiệp.

NHIỆM VỤ: Chỉ tư vấn các thông tin tuyển sinh dưới đây. Không bịa thông tin.

QUY TẮC TRẢ LỜI:
- Nếu câu hỏi liên quan đến học phí, mã ngành, tổ hợp xét tuyển, cơ hội việc làm, thời gian đào tạo của 4 ngành dưới đây → trả lời chi tiết dựa trên dữ liệu.
- Nếu câu hỏi KHÔNG có trong dữ liệu (ví dụ: ngành khác, môn học cụ thể, giảng viên, ký túc xá...) → trả lời CHÍNH XÁC câu sau, không thêm gì khác:
"Xin lỗi, hiện tôi chưa có thông tin về nội dung này."
- Định dạng bằng markdown khi liệt kê.

=== DỮ LIỆU TUYỂN SINH ===
${admissionsKnowledgeText}
=== HẾT DỮ LIỆU ===`;

export const askAdmissionsBot = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY chưa được cấu hình.");
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) {
        return { reply: "Hệ thống đang quá tải, bạn vui lòng thử lại sau ít phút nhé." };
      }
      if (res.status === 402) {
        return { reply: "Tạm thời chưa thể trả lời. Vui lòng liên hệ tổng đài 1900 9999." };
      }
      throw new Error(`AI gateway lỗi ${res.status}: ${text.slice(0, 200)}`);
    }

    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply =
      body.choices?.[0]?.message?.content?.trim() ||
      "Xin lỗi, hiện tôi chưa có thông tin về nội dung này.";
    return { reply };
  });
