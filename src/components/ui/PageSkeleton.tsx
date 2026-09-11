import { Container } from "./Container";


export function PageSkeleton() {
  return (
    <Container className="py-20">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-10 w-2/3 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 rounded-2xl bg-white/5" />
          <div className="h-40 rounded-2xl bg-white/5" />
          <div className="h-40 rounded-2xl bg-white/5" />
        </div>
      </div>
    </Container>
  );
}
