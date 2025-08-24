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
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface ConfirmationDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  confirmButtonClassName?: string;
  disabled?: boolean;
  triggerClassName?: string;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export function ConfirmationDialog({
  trigger,
  title,
  description,
  confirmText,
  onConfirm,
  confirmButtonClassName = "",
  disabled = false,
  triggerClassName = "",
  isLoading = false,
  onOpenChange,
  open,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={disabled} className={cn(triggerClassName)}>
          {trigger}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onConfirm} className={cn(confirmButtonClassName)}>
            {confirmText} {isLoading && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
