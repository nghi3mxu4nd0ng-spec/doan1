import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { majors } from "@/data/majors";
import heroImg from "@/assets/hero-campus.jpg";
import { ArrowRight, Award, BookOpen, Users, Sparkles, GraduationCap, Trophy, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đại học Xuân Đông — Tuyển sinh 2026" },
      { name: "description", content: "Trường Đại học Xuân Đông — Kiến tạo tương lai cùng thế hệ trẻ. Tuyển sinh 2026 đang mở cổng đăng ký." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Khuôn viên trường" className="absolute inset-0 h-full w-full object-cover" width={1600} height={900} />
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36 text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" /> Mùa tuyển sinh 2026 chính thức mở
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Kiến tạo tương lai — <br className="hidden md:block" />Bắt đầu từ <span className="text-white/95 underline decoration-white/40">Xuân Đông</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/90">
            Hơn 30 năm đào tạo nguồn nhân lực chất lượng cao. Môi trường học tập quốc tế, chương trình hiện đại, kết nối doanh nghiệp toàn cầu.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/dang-ky" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-elegant transition hover:scale-105">
              Đăng ký ngay <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/nganh-dao-tao" className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:bg-white/20">
              Khám phá ngành học
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-12 max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-card p-6 md:p-8 shadow-elegant border border-border">
          {[
            { icon: BookOpen, value: "32+", label: "Ngành đào tạo" },
            { icon: Users, value: "25.000+", label: "Sinh viên" },
            { icon: Award, value: "1.200+", label: "Giảng viên" },
            { icon: Trophy, value: "98%", label: "Có việc làm" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto h-7 w-7 text-primary" />
              <div className="mt-2 text-3xl font-bold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vì sao chọn Xuân Đông?</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm học tập đẳng cấp quốc tế với chi phí Việt Nam.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Chương trình quốc tế", desc: "Liên kết với 40+ đại học hàng đầu thế giới. Bằng cấp được công nhận toàn cầu." },
            { icon: HeartHandshake, title: "Kết nối doanh nghiệp", desc: "Thực tập có lương tại 500+ doanh nghiệp đối tác lớn trong và ngoài nước." },
            { icon: Trophy, title: "Học bổng hấp dẫn", desc: "Quỹ học bổng 50 tỷ đồng/năm dành cho sinh viên xuất sắc và hoàn cảnh khó khăn." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 transition hover:shadow-elegant hover:-translate-y-1">
              <div className="inline-flex rounded-lg bg-secondary p-3 text-primary"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Majors teaser */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ngành đào tạo nổi bật</h2>
              <p className="mt-2 text-muted-foreground">Khám phá các ngành học hot nhất mùa tuyển sinh 2026.</p>
            </div>
            <Link to="/nganh-dao-tao" className="text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {majors.map((m) => (
              <div key={m.slug} className="rounded-xl bg-card p-6 border border-border hover:border-primary transition">
                <m.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-semibold text-foreground">{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="gradient-hero rounded-3xl px-6 py-14 text-primary-foreground shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold">Sẵn sàng cho hành trình mới?</h2>
          <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">
            Đăng ký xét tuyển trực tuyến chỉ trong 3 phút. Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn.
          </p>
          <Link to="/dang-ky" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-semibold text-primary hover:scale-105 transition">
            Đăng ký ngay <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
