import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Target, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Giới thiệu — Đại học Xuân Đông" },
      { name: "description", content: "Hơn 30 năm xây dựng và phát triển — Trường Đại học Xuân Đông tự hào là môi trường đào tạo hàng đầu Việt Nam." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHero title="Giới thiệu về Xuân Đông" subtitle="Hơn 30 năm kiến tạo tri thức — Vươn tầm thế giới." />
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-6 text-foreground/90 leading-relaxed">
        <p>
          Trường Đại học Xuân Đông được thành lập năm 1993, là một trong những trường đại học đa ngành hàng đầu Việt Nam.
          Với hơn 25.000 sinh viên và 1.200 giảng viên trình độ cao, Xuân Đông tự hào là điểm đến tin cậy của hàng triệu phụ huynh và học sinh trên cả nước.
        </p>
        <p>
          Trường sở hữu hệ thống cơ sở vật chất hiện đại bậc nhất khu vực: thư viện số với 2 triệu đầu sách, phòng lab công nghệ cao,
          khu thể thao đa năng và ký túc xá tiện nghi cho 8.000 sinh viên.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 grid gap-6 md:grid-cols-3">
        {[
          { icon: Target, title: "Sứ mệnh", text: "Đào tạo nguồn nhân lực chất lượng cao, đóng góp vào sự phát triển bền vững của đất nước." },
          { icon: Eye, title: "Tầm nhìn", text: "Trở thành đại học nghiên cứu hàng đầu khu vực Đông Nam Á vào năm 2035." },
          { icon: Heart, title: "Giá trị cốt lõi", text: "Tri thức — Sáng tạo — Trách nhiệm — Hội nhập — Nhân văn." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6 hover:shadow-elegant transition">
            <Icon className="h-8 w-8 text-primary" />
            <h3 className="mt-3 font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
