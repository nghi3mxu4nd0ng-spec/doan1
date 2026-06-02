import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Send, Bot, User } from "lucide-react";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Chatbot AI — Đại học Xuân Đông" },
      { name: "description", content: "Trợ lý AI tư vấn tuyển sinh 24/7 của Đại học Xuân Đông." },
    ],
  }),
  component: Chat,
});

type Msg = { role: "bot" | "user"; text: string };

const replies: Record<string, string> = {
  "học phí": "Học phí dao động từ 24 — 28 triệu/năm tùy ngành. Bạn xem chi tiết tại trang Ngành đào tạo nhé!",
  "ngành": "Xuân Đông đang đào tạo các ngành hot: CNTT, Điện tử viễn thông, Quản trị kinh doanh, Marketing và nhiều ngành khác.",
  "đăng ký": "Bạn truy cập mục 'Đăng ký xét tuyển' và điền form. Đội ngũ tư vấn sẽ liên hệ trong 24h.",
  "học bổng": "Trường có quỹ học bổng 50 tỷ đồng/năm — học bổng tài năng, vượt khó, khuyến học.",
};

function autoReply(q: string) {
  const t = q.toLowerCase();
  for (const k of Object.keys(replies)) if (t.includes(k)) return replies[k];
  return "Cảm ơn bạn! Vui lòng để lại thông tin tại mục Liên hệ hoặc Đăng ký để được tư vấn chi tiết.";
}

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Xin chào! Mình là trợ lý AI của Đại học Xuân Đông. Bạn cần tư vấn về điều gì?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "bot", text: autoReply(q) }]);
    setInput("");
  };

  return (
    <PageShell>
      <PageHero title="Chatbot AI" subtitle="Trợ lý tư vấn tuyển sinh thông minh — Hoạt động 24/7." />
      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-secondary/30">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 grid h-9 w-9 place-items-center rounded-full ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-primary"}`}>
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3 flex gap-2 bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button onClick={send} className="rounded-lg gradient-hero px-5 text-primary-foreground hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          * Đây là chatbot demo — phản hồi dựa trên từ khóa cơ bản.
        </p>
      </section>
    </PageShell>
  );
}
