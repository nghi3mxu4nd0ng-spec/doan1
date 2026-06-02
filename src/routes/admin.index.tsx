import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { majors } from "@/data/majors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  ArrowUpDown,
  Download,
  GraduationCap,
  LogOut,
  Search,
  Users,
  CalendarDays,
  BookOpen,
  Trash2,
  ShieldCheck,
  UserCog,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Student = {
  id: string;
  fullname: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  major: string;
  score: number;
  note: string | null;
  created_at: string;
};

type Role = "admin" | "staff";

function AdminDashboard() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [major, setMajor] = useState<string>("all");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setAuthChecked(true);

      // Determine role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id);
      const roleList = (roles ?? []).map((r) => r.role as Role);
      const detected: Role | null = roleList.includes("admin")
        ? "admin"
        : roleList.includes("staff")
          ? "staff"
          : null;
      setRole(detected);

      if (!detected) {
        toast.error("Tài khoản chưa được cấp quyền truy cập trang quản trị.");
        setLoading(false);
        return;
      }

      const { data: rows, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Không thể tải dữ liệu", { description: error.message });
        setStudents([]);
      } else {
        setStudents((rows ?? []) as Student[]);
      }
      setLoading(false);
    })();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = students.filter((s) => {
      const matchMajor = major === "all" || s.major === major;
      const matchTerm =
        !term ||
        s.fullname.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.phone.toLowerCase().includes(term);
      return matchMajor && matchTerm;
    });
    list = [...list].sort((a, b) => {
      const da = new Date(a.created_at).getTime();
      const db = new Date(b.created_at).getTime();
      return sortAsc ? da - db : db - da;
    });
    return list;
  }, [students, q, major, sortAsc]);

  const exportCSV = () => {
    if (filtered.length === 0) {
      toast.info("Không có dữ liệu để xuất");
      return;
    }
    const headers = [
      "Họ tên",
      "Ngày sinh",
      "Số điện thoại",
      "Email",
      "Địa chỉ",
      "Ngành đăng ký",
      "Điểm học bạ",
      "Ghi chú",
      "Ngày đăng ký",
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = filtered.map((s) =>
      [
        s.fullname,
        s.birthday,
        s.phone,
        s.email,
        s.address,
        s.major,
        String(s.score),
        s.note ?? "",
        new Date(s.created_at).toLocaleString("vi-VN"),
      ]
        .map(escape)
        .join(","),
    );
    const csv = "\uFEFF" + [headers.map(escape).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thi-sinh-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Đã xuất ${filtered.length} hồ sơ`);
  };

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayCount = students.filter(
      (s) => new Date(s.created_at).toDateString() === today,
    ).length;
    const majorCount = new Set(students.map((s) => s.major)).size;
    return { total: students.length, today: todayCount, majors: majorCount };
  }, [students]);

  const handleDelete = async (id: string) => {
    if (role !== "admin") return;
    if (!confirm("Xóa hồ sơ này? Hành động không thể hoàn tác.")) return;
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      toast.error("Xóa thất bại", { description: error.message });
      return;
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Đã xóa hồ sơ");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-8 w-40" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8 space-y-4">
            <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold">Tài khoản chưa được cấp quyền</h2>
            <p className="text-sm text-muted-foreground">
              Liên hệ quản trị viên để được gán vai trò <b>admin</b> hoặc <b>staff</b>.
            </p>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <GraduationCap className="h-6 w-6" />
            <span>Admin · Xuân Đông</span>
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                role === "admin"
                  ? "bg-primary/10 text-primary"
                  : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
              )}
            >
              {role === "admin" ? <ShieldCheck className="h-3.5 w-3.5" /> : <UserCog className="h-3.5 w-3.5" />}
              {role === "admin" ? "Quản trị viên" : "Nhân viên tuyển sinh"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Quản lý hồ sơ thí sinh</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Theo dõi, tìm kiếm và xuất dữ liệu đăng ký xét tuyển.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Tổng hồ sơ" value={stats.total} icon={Users} />
          <StatCard label="Hôm nay" value={stats.today} icon={CalendarDays} />
          <StatCard label="Số ngành đã đăng ký" value={stats.majors} icon={BookOpen} />
        </div>

        {/* Toolbar */}
        <Card>
          <CardContent className="p-4 flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo họ tên, email, số điện thoại..."
                className="pl-9"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select value={major} onValueChange={setMajor}>
              <SelectTrigger className="lg:w-56">
                <SelectValue placeholder="Lọc ngành" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngành</SelectItem>
                {majors.map((m) => (
                  <SelectItem key={m.slug} value={m.name}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setSortAsc((v) => !v)}>
              <ArrowUpDown className="h-4 w-4" />
              {sortAsc ? "Cũ nhất trước" : "Mới nhất trước"}
            </Button>
            <Button onClick={exportCSV}>
              <Download className="h-4 w-4" /> Xuất CSV
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead>Ngày sinh</TableHead>
                    <TableHead>Ngành</TableHead>
                    <TableHead className="text-right">Điểm</TableHead>
                    <TableHead>Đăng ký lúc</TableHead>
                    {role === "admin" && <TableHead className="text-right">Hành động</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: role === "admin" ? 7 : 6 }).map((_, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={role === "admin" ? 7 : 6} className="text-center py-10 text-muted-foreground">
                        Chưa có hồ sơ nào phù hợp.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div className="font-medium text-foreground">{s.fullname}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {s.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{s.email}</div>
                          <div className="text-xs text-muted-foreground">{s.phone}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(s.birthday).toLocaleDateString("vi-VN")}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                            {s.major}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {Number(s.score).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(s.created_at).toLocaleString("vi-VN")}
                        </TableCell>
                        {role === "admin" && (
                          <TableCell className="text-right">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDelete(s.id)}
                              aria-label="Xóa hồ sơ"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Hiển thị {filtered.length} / {students.length} hồ sơ
        </p>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
