import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

import { PageShell, PageHero } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { majors } from "@/data/majors";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dang-ky")({
  head: () => ({
    meta: [
      { title: "Đăng ký xét tuyển — Đại học Xuân Đông" },
      {
        name: "description",
        content:
          "Đăng ký xét tuyển trực tuyến vào Đại học Xuân Đông chỉ trong 3 phút.",
      },
    ],
  }),
  component: Register,
});

const today = new Date();
const minDob = new Date(today.getFullYear() - 60, 0, 1);
const maxDob = new Date(today.getFullYear() - 15, 11, 31);

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên tối đa 100 ký tự")
    .regex(
      /^[\p{L}\s'.-]+$/u,
      "Họ tên chỉ chứa chữ cái và khoảng trắng",
    ),
  dob: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh")
    .refine((v) => {
      const d = new Date(v);
      return !Number.isNaN(d.getTime()) && d >= minDob && d <= maxDob;
    }, "Ngày sinh không hợp lệ (tuổi từ 15 đến 60)"),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)\d{9,10}$/, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ")
    .max(255, "Email quá dài"),
  address: z
    .string()
    .trim()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(255, "Địa chỉ tối đa 255 ký tự"),
  major: z.string().min(1, "Vui lòng chọn ngành đăng ký"),
  gpa: z.coerce
    .number({ invalid_type_error: "Điểm phải là số" })
    .min(0, "Điểm tối thiểu là 0")
    .max(10, "Điểm tối đa là 10"),
  note: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
});

type FormValues = z.infer<typeof schema>;

function Register() {
  const [done, setDone] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      major: "",
      gpa: undefined as unknown as number,
      note: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("students").insert({
      fullname: values.name,
      birthday: values.dob,
      phone: values.phone,
      email: values.email,
      address: values.address,
      major: values.major,
      score: values.gpa,
      note: values.note?.trim() ? values.note.trim() : null,
    });

    if (error) {
      toast.error("Gửi đăng ký thất bại", {
        description: error.message,
      });
      return;
    }

    toast.success("Đăng ký xét tuyển thành công!", {
      description: "Bộ phận tuyển sinh sẽ liên hệ với bạn trong 24 giờ.",
    });
    setDone(true);
  };

  if (done) {
    return (
      <PageShell>
        <PageHero title="Đăng ký thành công!" />
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <p className="mt-6 text-lg text-foreground">
            Cảm ơn bạn đã đăng ký xét tuyển vào Đại học Xuân Đông. Bộ phận
            tuyển sinh sẽ liên hệ với bạn trong vòng 24 giờ.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              form.reset();
              setDone(false);
            }}
          >
            Gửi đăng ký khác
          </Button>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero
        title="Đăng ký xét tuyển"
        subtitle="Điền thông tin bên dưới — Đội ngũ tư vấn sẽ liên hệ trong 24h."
      />
      <section className="mx-auto max-w-2xl px-4 py-14">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elegant space-y-5"
            noValidate
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày sinh *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0912345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ban@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ *</FormLabel>
                  <FormControl>
                    <Input placeholder="Số nhà, đường, quận/huyện, tỉnh/thành" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngành đăng ký *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="— Chọn ngành —" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {majors.map((m) => (
                          <SelectItem key={m.slug} value={m.slug}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm học bạ (0 - 10) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min={0}
                        max={10}
                        placeholder="8.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Thông tin bổ sung (không bắt buộc)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full gradient-hero text-primary-foreground shadow-elegant hover:opacity-95"
              size="lg"
            >
              Gửi đăng ký
            </Button>
          </form>
        </Form>
      </section>
    </PageShell>
  );
}
