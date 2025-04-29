"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tractor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando um login
    setTimeout(() => {
      setIsLoading(false)
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-[100vw] items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Tractor className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>Acesse o sistema de gerenciamento de estoque</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email do Usuário</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm">
              Não possui uma conta?{" "}
              <a href="/signup" className="text-green-600 hover:underline">
                Cadastrar
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
