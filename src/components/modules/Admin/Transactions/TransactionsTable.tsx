import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDebounce } from "@/hooks/use-debounce";

import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types/transaction.types";
import { TransactionDetailsModal } from "./TransactionDetailsModal";

export function TransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>("all");
  const [days, setDays] = useState<number>(7);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const params = {
    page: currentPage,
    limit: 10,
    transactionType: selectedTransactionType === "all" ? undefined : selectedTransactionType,
    days: days === 0 ? undefined : days,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
  };

  const { data: transactionsResponse, isLoading, error } = useGetAllTransactionsQuery(params);

  const transactions = transactionsResponse?.data || [];
  const meta = transactionsResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleViewDetails = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

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

  const transactionTypes = ["CASH_IN", "CASH_OUT", "SEND_MONEY", "ADMIN_CREDIT"];

  const setSelectedDays = (value: string) => {
    setDays(value === "all" ? 0 : Number(value));
    setCurrentPage(1);
  };

  const handleTransactionTypeChange = (type: string) => {
    setSelectedTransactionType(type);
    setCurrentPage(1);
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

  const isSearching = searchTerm !== debouncedSearchTerm && searchTerm.length > 0;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value || "");
    setCurrentPage(1);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between md:space-y-0 space-y-2 pb-2">
          <CardTitle>Transactions</CardTitle>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                className="pl-10"
                value={searchTerm || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            <Select onValueChange={setSelectedDays} defaultValue="7">
              <SelectTrigger className="md:w-[180px] w-full">
                <SelectValue placeholder="Select Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Days</SelectLabel>
                  <SelectItem value="3">Last 3 Days</SelectItem>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={handleTransactionTypeChange} defaultValue="all">
              <SelectTrigger className="md:w-[180px] w-full">
                <SelectValue placeholder="Transaction Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transaction Types</SelectLabel>
                  <SelectItem defaultChecked value="all">
                    All
                  </SelectItem>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {meta && (
              <div className="text-sm text-muted-foreground">
                {meta.total > 0
                  ? `Showing ${(meta.page - 1) * meta.limit + 1}-${Math.min(meta.page * meta.limit, meta.total)} of ${
                      meta.total
                    } transactions`
                  : "No transactions found"}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
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
                      <TableCell>
                        <Skeleton className="h-8 w-10" />
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
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-2">
                          {searchTerm && transactions.length === 0
                            ? "No transactions found matching your search."
                            : "No transactions found"}
                        </div>
                        {searchTerm && transactions.length === 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchTerm("");
                              setCurrentPage(1);
                            }}
                          >
                            Clear search
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction: ITransaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-mono text-sm">{transaction.transactionId}</TableCell>
                      <TableCell>{getTypeBadge(transaction.transactionType)}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(transaction.transactionAmount)}</TableCell>
                      <TableCell>{formatCurrency(transaction.transactionFee)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(transaction.netAmount)}</TableCell>
                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(transaction)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {!isLoading && transactions.length > 0 && meta && totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
