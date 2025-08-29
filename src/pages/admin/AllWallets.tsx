import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllWalletQuery, useUpdateWalletStatusMutation } from "@/redux/features/wallet/wallet.api";
import type { IWallet, TWalletStatus, TWalletType } from "@/types/wallet.types";
import { WALLET_STATUS, WALLET_TYPES } from "@/constants/wallet.constants";
import { useDebounce } from "@/hooks/use-debounce";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Shield,
  Wallet,
  Ban,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllWallets() {
  const [updateWalletStatusFn, { isLoading: updateWalletStatusLoading }] = useUpdateWalletStatusMutation();
  const [walletType, setWalletType] = useState<TWalletType | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAllWalletQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
    ...(walletType && { walletType }),
  });

  // Check if we're currently searching (debounced value differs from actual input)
  const isSearching = searchTerm !== debouncedSearchTerm && searchTerm.length > 0;

  const walletList = useMemo(() => (data?.data as IWallet[]) || [], [data?.data]);
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
  const totalWallets = meta?.total || 0;

  const handleStatusChange = async (walletId: string, newStatus: TWalletStatus) => {
    const updateData = {
      walletStatus: newStatus,
    };

    try {
      const res = await updateWalletStatusFn({ id: walletId, status: updateData }).unwrap();

      if (res.success) {
        toast.success("Wallet status updated successfully.");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating wallet:", error);
      toast.error("Failed to update wallet status.");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value || "");
    setCurrentPage(1); // Reset to first page when searching
  };

  const getStatusBadge = (status: TWalletStatus) => {
    switch (status) {
      case WALLET_STATUS.ACTIVE:
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case WALLET_STATUS.SUSPENDED:
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-500 dark:text-white  hover:bg-red-100">
            <Ban className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getWalletTypeBadge = (type: TWalletType) => {
    switch (type) {
      case WALLET_TYPES.ADMIN:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case WALLET_TYPES.MERCHANT:
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <CreditCard className="w-3 h-3 mr-1" />
            Merchant
          </Badge>
        );
      case WALLET_TYPES.USER:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Wallet className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="flex items-center justify-between">
            <span>Loading Wallets...</span>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search wallets..."
                disabled
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
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/40">
                <TableHead>Wallet Number</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-destructive mb-2">Error loading wallets</p>
              <p className="text-muted-foreground text-sm">Please try again later</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        <Card className="p-5">
          <CardHeader className="border-b border-border/40">
            <CardTitle className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
              <span>All Wallets ({totalWallets})</span>
              <div className="flex flex-col mt-5 md:flex-row md:items-center md:justify-center gap-5">
                <Select
                  onValueChange={(value) => setWalletType(value === "all" ? null : (value as TWalletType))}
                  defaultValue="all"
                >
                  <SelectTrigger className="md:w-[180px] w-full">
                    <SelectValue placeholder="Select Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Wallet</SelectLabel>
                      <SelectItem value="all">All Wallets</SelectItem>
                      <SelectItem value="ADMIN">Admin Wallet</SelectItem>
                      <SelectItem value="USER">User Wallet</SelectItem>
                      <SelectItem value="MERCHANT">Merchant Wallet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="relative md:w-80 ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search wallets..."
                    value={searchTerm || ""}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/40">
                  <TableHead>Wallet Number</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {walletList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-muted-foreground mb-2">
                          {searchTerm && walletList.length === 0
                            ? "No wallets found matching your search."
                            : "No wallets found."}
                        </div>
                        {searchTerm && walletList.length === 0 && (
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
                  walletList.map((wallet: IWallet, index: number) => (
                    <TableRow
                      key={wallet._id}
                      className={index === walletList.length - 1 ? "border-0" : "border-b border-border/20"}
                    >
                      <TableCell className="font-medium font-mono">{wallet.walletNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {wallet.user.firstName} {wallet.user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">{wallet.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getWalletTypeBadge(wallet.walletType)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(wallet.balance)}</TableCell>
                      <TableCell>{getStatusBadge(wallet.walletStatus)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(wallet.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <ConfirmationDialog
                              trigger="Activate Wallet"
                              title="Activate Wallet"
                              description={`Are you sure you want to activate wallet "${wallet.walletNumber}"? This will allow the user to perform transactions.`}
                              confirmText="Activate Wallet"
                              onConfirm={() => handleStatusChange(wallet._id, WALLET_STATUS.ACTIVE)}
                              confirmButtonClassName="bg-green-600 text-white hover:bg-green-700"
                              disabled={wallet.walletStatus === WALLET_STATUS.ACTIVE}
                              isLoading={updateWalletStatusLoading}
                            />

                            <ConfirmationDialog
                              trigger="Suspend Wallet"
                              title="Suspend Wallet"
                              description={`Are you sure you want to suspend wallet "${wallet.walletNumber}"? This will prevent the user from performing any transactions until the wallet is reactivated.`}
                              confirmText="Suspend Wallet"
                              onConfirm={() => handleStatusChange(wallet._id, WALLET_STATUS.SUSPENDED)}
                              confirmButtonClassName="bg-red-600 text-white hover:bg-red-700"
                              disabled={wallet.walletStatus === WALLET_STATUS.SUSPENDED}
                              isLoading={updateWalletStatusLoading}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/40">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalWallets)}{" "}
                  of {totalWallets} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else {
                        const start = Math.max(1, currentPage - 2);
                        const end = Math.min(totalPages, start + 4);
                        pageNum = start + i;
                        if (pageNum > end) return null;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
