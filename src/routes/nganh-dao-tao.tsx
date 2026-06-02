import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { majors } from "@/data/majors";
import { Clock, DollarSign, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/nganh-dao-tao")({
  head: () => ({
    meta: [
      { title: "Ngành đào tạo — Đại học Xuân Đông" },
      { name: "description", content: "Khám phá các ngành đào tạo: CNTT, Điện tử viễn thông, Quản trị kinh doanh, Marketing." },
    ],
  }),
  component: Majors,
});

function Majors() {
  return (
    <PageShell>
      <PageHero title="Ngành đào tạo" subtitle="Chương trình hiện đại — Cập nhật xu hướng thị trường lao động 2026." />
      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-6 md:grid-cols-2">
        {majors.map((m) => (
          <article key={m.slug} className="rounded-2xl border border-border bg-card p-7 hover:shadow-elegant hover:-translate-y-1 transition">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-secondary p-3 text-primary"><m.icon className="h-7 w-7" /></div>
              <h2 className="text-xl font-bold text-foreground">{m.name}</h2>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{m.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Học phí</div>
                  <div className="font-semibold">{m.tuition}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Thời gian</div>
                  <div className="font-semibold">{m.duration}</div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Briefcase className="h-4 w-4 text-primary" /> Cơ hội việc làm
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {m.careers.map((c) => (
                  <span key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{c}</span>
                ))}
              </div>
            </div>
            <Link to="/dang-ky" className="mt-6 inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all">
              Đăng ký ngành này <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
