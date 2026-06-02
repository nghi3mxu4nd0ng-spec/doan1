import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên hệ — Đại học Xuân Đông" },
      { name: "description", content: "Thông tin liên hệ và địa chỉ Trường Đại học Xuân Đông." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageHero title="Liên hệ với chúng tôi" subtitle="Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn." />
      <section className="mx-auto max-w-6xl px-4 py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: MapPin, title: "Địa chỉ", text: "123 Đường Tri Thức, Quận 1, TP.HCM" },
          { icon: Phone, title: "Hotline", text: "1900 8686" },
          { icon: Mail, title: "Email", text: "tuyensinh@hungviet.edu.vn" },
          { icon: Clock, title: "Giờ làm việc", text: "Thứ 2 — Thứ 7: 7:30 — 17:30" },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-elegant transition">
            <Icon className="mx-auto h-8 w-8 text-primary" />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
          <iframe
            title="Bản đồ"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.69%2C10.77%2C106.71%2C10.78&layer=mapnik"
            className="w-full h-[400px] border-0"
            loading="lazy"
          />
        </div>
      </section>
    </PageShell>
  );
}
