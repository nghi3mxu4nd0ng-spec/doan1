REVOKE SELECT ON public.students FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.students FROM authenticated;