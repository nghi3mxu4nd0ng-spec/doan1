// Dữ liệu tuyển sinh dùng chung cho UI và chatbot AI (đồng bộ với tuyensinh-data.txt).

export type AdmissionMajor = {
  slug: string;
  name: string;
  code: string;
  tuition: string;
  duration: string;
  combinations: string[];
  careers: string;
};

export const admissionsData: AdmissionMajor[] = [
  {
    slug: "cntt",
    name: "Công nghệ thông tin",
    code: "7480201",
    tuition: "28.000.000 đ/năm",
    duration: "4 năm",
    combinations: ["A00 (Toán-Lý-Hóa)", "A01 (Toán-Lý-Anh)", "D01 (Toán-Văn-Anh)", "D07 (Toán-Hóa-Anh)"],
    careers:
      "Kỹ sư phần mềm, Lập trình viên Full-stack, Chuyên gia AI/Data, Kỹ sư DevOps, Kỹ sư an ninh mạng. Lương khởi điểm 12-25 triệu/tháng.",
  },
  {
    slug: "dtvt",
    name: "Điện tử viễn thông",
    code: "7520207",
    tuition: "26.000.000 đ/năm",
    duration: "4,5 năm",
    combinations: ["A00 (Toán-Lý-Hóa)", "A01 (Toán-Lý-Anh)", "A02 (Toán-Lý-Sinh)", "D90 (Toán-KHTN-Anh)"],
    careers:
      "Kỹ sư viễn thông, Thiết kế vi mạch IC, Kỹ sư IoT/Hệ thống nhúng, Kỹ sư mạng 5G/6G tại Viettel, VNPT, Samsung, FPT.",
  },
  {
    slug: "marketing",
    name: "Marketing",
    code: "7340115",
    tuition: "25.000.000 đ/năm",
    duration: "4 năm",
    combinations: ["A00 (Toán-Lý-Hóa)", "A01 (Toán-Lý-Anh)", "D01 (Toán-Văn-Anh)", "C00 (Văn-Sử-Địa)"],
    careers:
      "Digital Marketer, Brand Manager, Content Creator, Performance Marketing, Phân tích thị trường, Account Executive.",
  },
  {
    slug: "qtkd",
    name: "Quản trị kinh doanh",
    code: "7340101",
    tuition: "24.000.000 đ/năm",
    duration: "4 năm",
    combinations: ["A00 (Toán-Lý-Hóa)", "A01 (Toán-Lý-Anh)", "D01 (Toán-Văn-Anh)", "C00 (Văn-Sử-Địa)"],
    careers:
      "Quản lý dự án, Chuyên viên nhân sự, Quản lý vận hành, Chuyên viên kinh doanh, Khởi nghiệp, Phân tích kinh doanh.",
  },
];

export const admissionsKnowledgeText = admissionsData
  .map(
    (m, i) => `${i + 1}) ${m.name.toUpperCase()}
- Mã ngành: ${m.code}
- Học phí: ${m.tuition}
- Thời gian đào tạo: ${m.duration}
- Tổ hợp xét tuyển: ${m.combinations.join(", ")}
- Cơ hội việc làm: ${m.careers}`,
  )
  .join("\n\n");
