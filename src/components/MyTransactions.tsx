import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import type { ITransaction } from "@/types/transaction.types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import type { TRole } from "@/types/user.types";

export default function MyTransactions() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>("all");
  const [days, setDays] = useState<number>(7);

  // Handler to reset page when transaction type changes
  const handleTransactionTypeChange = (type: string) => {
    setSelectedTransactionType(type);
    setCurrentPage(1);
  };
  const itemsPerPage = 10;

  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfoQuery();

  const userRole = userInfo?.data?.role;

  const userTransactionTypes = ["CASH_IN", "CASH_OUT", "SEND_MONEY"];
  const agentTransactionTypes = ["CASH_IN", "CASH_OUT", "ADMIN_CREDIT"];
  const adminTransactionTypes = ["ADMIN_CREDIT"];

  const params = {
    page: currentPage,
    limit: itemsPerPage,
    transactionType: selectedTransactionType === "all" ? undefined : selectedTransactionType,
    days: days === 0 ? undefined : days,
  };

  const { data, isLoading, error } = useGetMyTransactionsQuery(params);

  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const { data: myWallet, isLoading: isLoadingWallet } = useGetMyWalletQuery();

  const transactions = data?.data || [];
  const meta = data?.meta;

  // Get pagination info from backend meta
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || 0;
  const startIndex = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const endIndex = meta ? Math.min(meta.page * meta.limit, totalItems) : 0;

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
      // eslint-disable-next-line no-console
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
      currency: "BDT",
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

  // console.log(TransactionType);

  const getTransactionTypes = (role: TRole) => {
    switch (role) {
      case "USER":
        return userTransactionTypes;
      case "AGENT":
        return agentTransactionTypes;
      case "ADMIN":
        return adminTransactionTypes;
      default:
        return [];
    }
  };

  const setSelectedDays = (days: string) => {
    setDays(days === "all" ? 0 : Number(days));
    setCurrentPage(1);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>My Transactions</CardTitle>

        <div className="flex items-center justify-center gap-5">
          {/* select days */}
          <Select onValueChange={setSelectedDays} defaultValue="7">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Time</SelectItem>
                <SelectLabel>Select Days</SelectLabel>
                <SelectItem value="3">Last 3 Days</SelectItem>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleTransactionTypeChange} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transaction Types</SelectLabel>
                <SelectItem defaultChecked value="all">
                  All
                </SelectItem>
                {isLoadingUserInfo ? (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                ) : (
                  getTransactionTypes(userRole as TRole).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ")}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-sm text-muted-foreground">
            {totalItems > 0 ? `Showing ${startIndex}-${endIndex} of ${totalItems} ` : "No transactions found"}
          </div>
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
              {isLoading || isLoadingWallet ? (
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
                transactions.map((transaction: ITransaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center">
                        <span className="truncate">{transaction.transactionId}</span>
                        <CopyButton text={transaction.transactionId} label="Transaction ID" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {myWallet?.data?.walletNumber === transaction.toWallet.walletNumber
                        ? "Self"
                        : transaction.toWallet.walletNumber}
                    </TableCell>
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
        {totalPages > 1 && (
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
        )}
      </CardContent>
    </Card>
  );
}
