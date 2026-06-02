import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7" />
            Đại học Xuân Đông
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
            Đào tạo nguồn nhân lực chất lượng cao, kiến tạo tương lai bền vững cho thế hệ trẻ Việt Nam.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Youtube" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Liên kết</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
            <li><Link to="/nganh-dao-tao" className="hover:text-white">Ngành đào tạo</Link></li>
            <li><Link to="/tuyen-sinh-2026" className="hover:text-white">Tuyển sinh 2026</Link></li>
            <li><Link to="/dang-ky" className="hover:text-white">Đăng ký xét tuyển</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/chatbot" className="hover:text-white">Chatbot AI</Link></li>
            <li><Link to="/lien-he" className="hover:text-white">Liên hệ tư vấn</Link></li>
            <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-white">Học phí & học bổng</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> 123 Đường Tri Thức, Quận 1, TP.HCM</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> 1900 8686</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> tuyensinh@hungviet.edu.vn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/70">
        © 2026 Trường Đại học Xuân Đông. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
