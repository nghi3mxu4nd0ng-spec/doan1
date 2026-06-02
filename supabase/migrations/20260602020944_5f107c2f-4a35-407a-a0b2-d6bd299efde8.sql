CREATE POLICY "Staff can view students"
ON public.students FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'staff'));