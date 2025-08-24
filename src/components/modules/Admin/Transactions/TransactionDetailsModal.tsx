"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { ITransaction } from "@/types/transaction.types";

interface WalletDetailsModalProps {
  transaction: ITransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailsModal({ transaction, isOpen, onClose }: WalletDetailsModalProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set(prev).add(text));
      toast.success(`${label} copied to clipboard!`);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(text);
          return newSet;
        });
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Could not copy to clipboard");
    }
  };

  const CopyButton = ({ text, label }: { text: string; label: string }) => (
    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(text, label)} className="h-6 w-6 p-0">
      {copiedItems.has(text) ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
      <span className="sr-only">Copy {label}</span>
    </Button>
  );

  if (!transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded truncate">{transaction.transactionId}</code>
                    <CopyButton text={transaction.transactionId} label="Transaction ID" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <div className="mt-1">
                    <Badge variant="outline">{transaction.transactionType.replace("_", " ")}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        transaction.status === "SUCCESS"
                          ? "default"
                          : transaction.status === "PENDING"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reference</label>
                  <div className="mt-1">
                    <span className="text-sm">{transaction.reference || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <div className="text-lg font-semibold mt-1">{formatCurrency(transaction.transactionAmount)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fee</label>
                  <div className="text-lg font-semibold mt-1">{formatCurrency(transaction.transactionFee)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Net Amount</label>
                  <div className="text-lg font-semibold mt-1">{formatCurrency(transaction.netAmount)}</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                    <div className="text-sm mt-1">{formatDate(transaction.createdAt)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                    <div className="text-sm mt-1">{formatDate(transaction.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Wallet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-red-600 dark:text-red-400">From Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wallet ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1 truncate">
                      {transaction.fromWallet._id}
                    </code>
                    <CopyButton text={transaction.fromWallet._id} label="From Wallet ID" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wallet Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                      {transaction.fromWallet.walletNumber}
                    </code>
                    <CopyButton text={transaction.fromWallet.walletNumber} label="From Wallet Number" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1 truncate">
                      {transaction.fromWallet.user}
                    </code>
                    <CopyButton text={transaction.fromWallet.user} label="From User ID" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* To Wallet */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600 dark:text-green-400">To Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wallet ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1 truncate">
                      {transaction.toWallet._id}
                    </code>
                    <CopyButton text={transaction.toWallet._id} label="To Wallet ID" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wallet Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                      {transaction.toWallet.walletNumber}
                    </code>
                    <CopyButton text={transaction.toWallet.walletNumber} label="To Wallet Number" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1  truncate">
                      {transaction.toWallet.user}
                    </code>
                    <CopyButton text={transaction.toWallet.user} label="To User ID" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
