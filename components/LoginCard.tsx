"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface LoginCardProps {
  onOtpSent: (email: string) => void
}

const LoginCard = ({ onOtpSent }: LoginCardProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [loading, setLoading] = useState(false)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Enter your email")
      return
    }

    if (showPasswordField) {
      if (!password) {
        toast.error("Enter your password")
        return
      }

      setLoading(true)
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          toast.error(data.error || "Login failed")
          return
        }

        toast.success("Logged in")
        router.push("/app")
      } finally {
        setLoading(false)
      }
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to send OTP")
        return
      }

      toast.success("OTP sent to your email")
      onOtpSent(email)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="min-w-full sm:min-w-md">
      <CardContent>
        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          onClick={() => {
            router.push(`${backendUrl}/oauth2/authorization/google`)
          }}
        >
          <Image
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="Google logo"
            width={80}
            height={20}
          />
        </Button>

        <div className="my-5 flex w-full items-center gap-4">
          <div className="h-px w-full bg-gray-300/90"></div>
          <p className="w-full text-sm text-nowrap text-gray-500/90">
            or sign in with email
          </p>
          <div className="h-px w-full bg-gray-300/90"></div>
        </div>

        <FieldGroup className="max-w-full">
          <Field>
            <InputGroup className="min-h-12 rounded-full p-2">
              <InputGroupInput
                id="inline-end-input"
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroupAddon align="inline-start">
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field className={showPasswordField ? "block" : "hidden"}>
            <InputGroup className="min-h-12 rounded-full p-2">
              <InputGroupInput
                id="inline-end-input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroupAddon align="inline-start">
                <LockKeyhole />
              </InputGroupAddon>
              <InputGroupButton
                type="button"
                variant="secondary"
                size="icon-sm"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="bg-hidden text-muted-foreground"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroup>
          </Field>
        </FieldGroup>

        <div className="mt-6 flex w-full justify-end">
          <span
            className="cursor-pointer font-medium text-indigo-500"
            onClick={() => setShowPasswordField((prev) => !prev)}
          >
            {showPasswordField ? "Forgot password" : "Use password"}
          </span>
        </div>

        <Button
          size="lg"
          className="mt-8 min-h-12 w-full text-[15px] rounded-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginCard
