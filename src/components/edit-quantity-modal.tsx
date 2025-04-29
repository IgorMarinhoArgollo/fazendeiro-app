"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditQuantityModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: number
    name: string
    quantity: number
    unit: string
  }
  onSave: (id: number, quantity: number) => void
}

export function EditQuantityModal({ isOpen, onClose, item, onSave }: EditQuantityModalProps) {
  const [quantity, setQuantity] = useState("")

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity.toString())
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(item.id, Number(quantity))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Alterar Quantidade</DialogTitle>
            <DialogDescription>Atualize a quantidade em estoque para {item?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantidade
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1"
                  required
                />
                <span>{item?.unit}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
