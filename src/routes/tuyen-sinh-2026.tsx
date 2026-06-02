import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { CalendarDays, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tuyen-sinh-2026")({
  head: () => ({
    meta: [
      { title: "Tuyển sinh 2026 — Đại học Xuân Đông" },
      { name: "description", content: "Phương thức xét tuyển, lịch trình và chỉ tiêu tuyển sinh năm 2026 của Đại học Xuân Đông." },
    ],
  }),
  component: Admissions,
});

const timeline = [
  { date: "01/03/2026", title: "Mở cổng đăng ký trực tuyến" },
  { date: "30/05/2026", title: "Hạn cuối nộp hồ sơ xét học bạ" },
  { date: "15/07/2026", title: "Công bố kết quả đợt 1" },
  { date: "10/08/2026", title: "Nhập học chính thức" },
];

const methods = [
  { title: "Xét tuyển học bạ THPT", desc: "Áp dụng cho học sinh có điểm trung bình 3 năm THPT từ 7.0 trở lên." },
  { title: "Xét điểm thi tốt nghiệp THPT", desc: "Theo tổ hợp môn xét tuyển của từng ngành. Điểm chuẩn dự kiến 18 — 26 điểm." },
  { title: "Xét tuyển thẳng", desc: "HSG quốc gia, học sinh trường chuyên, đạt giải các cuộc thi quốc tế." },
  { title: "Đánh giá năng lực", desc: "Theo kết quả kỳ thi ĐGNL của ĐHQG TP.HCM và ĐHQG Hà Nội." },
];

function Admissions() {
  return (
    <PageShell>
      <PageHero title="Tuyển sinh 2026" subtitle="4 phương thức xét tuyển — 5.000 chỉ tiêu — Cơ hội mở rộng cho mọi thí sinh." />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <FileCheck className="h-7 w-7 text-primary" /> Phương thức xét tuyển
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {methods.map((m, i) => (
            <div key={m.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold">{i + 1}</span>
                <h3 className="font-semibold text-lg">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <CalendarDays className="h-7 w-7 text-primary" /> Lịch trình tuyển sinh
          </h2>
          <ol className="relative border-l-2 border-primary/30 ml-3 space-y-6">
            {timeline.map((t) => (
              <li key={t.date} className="ml-6">
                <span className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div className="text-sm text-primary font-semibold">{t.date}</div>
                <div className="font-medium text-foreground">{t.title}</div>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link to="/dang-ky" className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground hover:bg-primary-glow transition">
              Đăng ký xét tuyển ngay <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
