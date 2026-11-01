import { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "join",
  description: "join our workspace",
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}
