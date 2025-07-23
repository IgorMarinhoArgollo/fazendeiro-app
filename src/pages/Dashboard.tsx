/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { LogOut, Package, Plus, Search, Tractor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AddItemModal } from "@/components/add-item-modal"
import { EditQuantityModal } from "@/components/edit-quantity-modal"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"


type InventoryItem = {
  id: number
  name: string
  quantity: number
  unit: string
  batch: string
  location: string
  expiryDate: string
}

export default function Dashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  // Filtra o inventário com base no termo de busca
  const filteredInventory = inventory.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  // Buscar inventário da API ao montar o componente
  React.useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/produto/listar`)
        if (!response.ok) throw new Error("Erro ao buscar inventário")
        const data = await response.json()
        setInventory(data)
      } catch (error) {
        console.log(error);
        setInventory([])
      }
    }
    fetchInventory()
  }, [])

  // Função para adicionar um novo item
  const handleAddItem = (newItem: { name: string; quantity: number; unit: string; batch: string; location: string; expiryDate: string }) => {
    setInventory([...inventory, { ...newItem, id: inventory.length + 1 }])
  }

  // Função para editar a quantidade de um item
  const handleEditQuantity = (id: number, newQuantity: number) => {
    setInventory(inventory.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    setIsEditModalOpen(false)
    setSelectedItem(null)
  }

  // Função para abrir o modal de edição
  const openEditModal = (item: InventoryItem) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  // Verifica se um produto está próximo da data de validade (menos de 30 dias)
  const isNearExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  // Verifica se um produto está vencido
  const isExpired = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    return expiry < today
  }

  return (
    <SidebarProvider className="w-[100vw]">
      <div className="flex h-screen bg-muted/40 w-[100vw]">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <Tractor className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-lg font-semibold">FarmStock</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Package />
                    <span>Estoque</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Home />
                    <span>Fazenda</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <User />
                    <span>Usuários</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem className="cursor-not-allowed text-gray-600">
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings />
                    <span>Configurações</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <LogOut />
                    <span>Sair</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Gerenciamento de Estoque</h1>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4">
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Local de Armazenamento</TableHead>
                    <TableHead>Data de Validade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum produto encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {formatDate(item.expiryDate)}
                            {isExpired(item.expiryDate) && <Badge variant="destructive">Vencido</Badge>}
                            {isNearExpiry(item.expiryDate) && (
                              <Badge variant="destructive" className="bg-amber-500">
                                Próximo ao vencimento
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openEditModal(item)}>
                            Alterar Quantidade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>

      {/* Modal para adicionar item */}
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />

      {/* Modal para editar quantidade */}
      {selectedItem && (
        <EditQuantityModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedItem(null)
          }}
          item={selectedItem}
          onSave={handleEditQuantity}
        />
      )}
    </SidebarProvider>
  )
}

// Função para formatar a data
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR").format(date)
}
