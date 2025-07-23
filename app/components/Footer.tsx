import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full border-t border-border mb-6" />
          <div className="flex gap-x-10 justify-center items-center mb-4">
            <div className="relative group">
              <span className="text-sm font-semibold leading-6 text-foreground cursor-default">
                Mtra Sof-ia
              </span>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                Pre-Launch: 25 de agosto, 2025
              </div>
            </div>
            <div className="relative group">
              <span className="text-sm font-semibold leading-6 text-foreground cursor-default">
                Impulsa AI
              </span>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                Pre-Launch: 3 de diciembre, 2025
              </div>
            </div>
          </div>
          <p className="text-center text-xs leading-5 text-muted-foreground">
            Creamos IA para tu día a día. © {new Date().getFullYear()} Directiva AI
          </p>
        </div>
      </div>
    </footer>
  )
}
