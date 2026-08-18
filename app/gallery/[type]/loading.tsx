export default function GalleryLoading() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container-app py-25">
        <div className="mx-auto mb-20 mt-10 h-14 w-72 animate-pulse rounded-xl bg-border md:h-20" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:flex gap-8">
            <aside className="w-60 shrink-0">
              <div className="sticky top-28 rounded-3xl border border-border bg-background-elevated p-6 shadow-sm">
                <div className="mb-5 h-6 w-32 animate-pulse rounded bg-border" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-11 animate-pulse rounded-xl bg-border"
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-3/4 animate-pulse rounded-xl bg-border"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
