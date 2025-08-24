import { useState, useMemo, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

import type { ITransaction } from "@/types/transaction.types";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";

export default function MyTransactions() {
  const { data, isLoading, error } = useGetMyTransactionsQuery(null);
  console.log(data);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const transactions = useMemo(() => data?.data || [], [data?.data]);

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = useMemo(
    () => transactions.slice(startIndex, endIndex),
    [transactions, startIndex, endIndex]
  );

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [transactions.length]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set(prev).add(text));
      toast.success(`${label} copied to clipboard!`);

      // Remove from copied items after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(text);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Could not copy to clipboard");
    }
  };

  const CopyButton = ({ text, label }: { text: string; label: string }) => (
    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(text, label)} className="h-6 w-6 p-0 ml-2">
      {copiedItems.has(text) ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
      <span className="sr-only">Copy {label}</span>
    </Button>
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      SUCCESS: "default",
      PENDING: "secondary",
      FAILED: "destructive",
    } as const;

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      CASH_OUT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      CASH_IN: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      SEND_MONEY: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ADMIN_CREDIT: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    } as const;

    return <Badge className={colors[type as keyof typeof colors] || ""}>{type.replace("_", " ")}</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>My Transactions</CardTitle>
        <div className="text-sm text-muted-foreground">
          {transactions.length > 0
            ? `Showing ${startIndex + 1}-${Math.min(endIndex, transactions.length)} of ${
                transactions.length
              } transaction${transactions.length > 1 ? "s" : ""}`
            : "No transactions found"}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Net Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeleton rows
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-destructive">
                    Failed to load transactions. Please try again.
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                currentTransactions.map((transaction: ITransaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center">
                        <span className="truncate">{transaction.transactionId}</span>
                        <CopyButton text={transaction.transactionId} label="Transaction ID" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{transaction.toWallet.walletNumber}</TableCell>
                    <TableCell>{getTypeBadge(transaction.transactionType)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(transaction.transactionAmount)}</TableCell>
                    <TableCell>{formatCurrency(transaction.transactionFee)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(transaction.netAmount)}</TableCell>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current page
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        }
      </CardContent>
    </Card>
  );
}
