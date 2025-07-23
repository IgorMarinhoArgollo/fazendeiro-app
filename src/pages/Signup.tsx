"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tractor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [farm, setFarm] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/fazenda/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fazendaId: 0,
          nome: farm,
          email,
          senha
        })
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar fazenda")
      }

      setIsLoading(false)
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      alert("Falha no cadastro")
    }
  }

  return (
    <div className="flex min-h-screen w-[100vw] items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Tractor className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>Cadastre-se para gerenciar o estoque da sua fazenda</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm">Nome da Fazenda</Label>
              <Input id="farm" placeholder="Fazenda Boa Vista" value={farm} onChange={e => setFarm(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email do Usuário</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-8" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <div className="text-center text-sm">
              Já possui uma conta?{" "}
              <a href="/" className="text-green-600 hover:underline">
                Entrar
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
