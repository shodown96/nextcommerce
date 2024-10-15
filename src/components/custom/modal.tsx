import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { XIcon } from "lucide-react"

import React, { ReactNode } from 'react'
interface ModalProps {
    open: boolean,
    title: string,
    children: ReactNode
    setOpen: (v: boolean) => void
}
function Modal({ open, title, children, setOpen }: ModalProps) {
    return (
        <AlertDialog open={open}>
            <div className="p-1">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex justify-between">
                            <div>{title}</div>
                            <XIcon onClick={() => setOpen(false)} className="cursor-pointer" />
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            {children}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </div>
        </AlertDialog>

    )
}

export default Modal