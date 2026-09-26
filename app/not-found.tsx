import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-[12vw] font-bold leading-none tracking-tighter text-foreground/5 md:text-[8vw]">
        404
      </span>
      <h1 className="-mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-background transition-all hover:opacity-80"
      >
        Volver al inicio →
      </Link>
    </div>
  )
}
