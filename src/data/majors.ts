import { Cpu, Radio, Briefcase, Megaphone, type LucideIcon } from "lucide-react";

export type Major = {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  tuition: string;
  duration: string;
  careers: string[];
};

export const majors: Major[] = [
  {
    slug: "cntt",
    name: "Công nghệ thông tin",
    icon: Cpu,
    description:
      "Đào tạo kỹ sư CNTT chuyên sâu về lập trình, phát triển phần mềm, trí tuệ nhân tạo, dữ liệu lớn và an ninh mạng.",
    tuition: "28.000.000 đ/năm",
    duration: "4 năm",
    careers: ["Kỹ sư phần mềm", "Chuyên gia AI/Data", "Kỹ sư DevOps", "Quản trị hệ thống"],
  },
  {
    slug: "dtvt",
    name: "Điện tử viễn thông",
    icon: Radio,
    description:
      "Trang bị kiến thức về thiết kế vi mạch, hệ thống nhúng, mạng 5G/6G và truyền thông không dây hiện đại.",
    tuition: "26.000.000 đ/năm",
    duration: "4.5 năm",
    careers: ["Kỹ sư viễn thông", "Kỹ sư thiết kế chip", "Kỹ sư IoT", "Kỹ sư mạng"],
  },
  {
    slug: "qtkd",
    name: "Quản trị kinh doanh",
    icon: Briefcase,
    description:
      "Phát triển nhà quản lý hiện đại với tư duy chiến lược, kỹ năng lãnh đạo, tài chính, nhân sự và khởi nghiệp.",
    tuition: "24.000.000 đ/năm",
    duration: "4 năm",
    careers: ["Quản lý dự án", "Chuyên viên nhân sự", "Quản lý vận hành", "Khởi nghiệp"],
  },
  {
    slug: "marketing",
    name: "Marketing",
    icon: Megaphone,
    description:
      "Đào tạo chuyên gia marketing số, thương hiệu, nghiên cứu thị trường và truyền thông tích hợp đa kênh.",
    tuition: "25.000.000 đ/năm",
    duration: "4 năm",
    careers: ["Digital Marketer", "Brand Manager", "Content Creator", "Phân tích thị trường"],
  },
];
