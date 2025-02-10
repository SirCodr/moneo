"use client";

import { TransactionForm } from "@/components/transaction-form";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function TransactionFormModal() {
  const router = useRouter()

  const closeModal = () => {
      router.back()
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Transaction create form
          </DialogTitle>
        </DialogHeader>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
}