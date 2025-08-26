import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import type { IsActive, IUser, TRole } from "@/types/user.types";
import { USER_STATUS, USER_ROLES } from "@/constants/user.constants";
import { MoreHorizontal, Search, Shield, Trash2, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function UserManagementTable() {
  const [updateUserFn, { isLoading: updateUserLoading }] = useUpdateUserMutation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // server-side params
  const params = {
    role: USER_ROLES.USER,
    page: String(currentPage),
    limit: String(itemsPerPage),
    ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
  };

  const { data: usersResponse, isLoading, isError } = useGetAllUsersQuery(params);

  const users = (usersResponse?.data as IUser[]) || [];
  const meta = usersResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleStatusChange = async (userId: string, newStatus: IsActive) => {
    const updateData = {
      isActive: newStatus,
    };

    try {
      const res = await updateUserFn({ id: userId, data: updateData }).unwrap();

      if (res.success) {
        toast.success("User status updated successfully.");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating user:", error);
      toast.error("Failed to update user status.");
    }
  };

  const handleDeleteUser = async (userId: string, isDeleted: boolean) => {
    const updateData = {
      isDeleted: !isDeleted,
    };

    try {
      const res = await updateUserFn({ id: userId, data: updateData }).unwrap();
      if (res.success) {
        toast.success(`User ${!isDeleted ? "deleted" : "recovered"} successfully.`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating user delete status:", error);
      toast.error(`Failed to ${!isDeleted ? "delete" : "recover"} user.`);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value || "");
    setCurrentPage(1);
  };

  const getStatusBadge = (status: IsActive) => {
    switch (status) {
      case USER_STATUS.ACTIVE:
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case USER_STATUS.INACTIVE:
        return <Badge variant="secondary">Inactive</Badge>;
      case USER_STATUS.BLOCKED:
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: TRole) => {
    return role === USER_ROLES.ADMIN ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <Shield className="w-3 h-3 mr-1" />
        {role}
      </Badge>
    ) : (
      <Badge variant="outline">{role}</Badge>
    );
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

  // Handle loading and error states
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="flex items-center justify-between">
            <span>Loading Users...</span>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search users..." disabled className="pl-10" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/40">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Deleted</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
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
              <p className="text-destructive mb-2">Error loading users</p>
              <p className="text-muted-foreground text-sm">Please try again later</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <span>Users ({users.length})</span>
          <div className="relative md:w-80 mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Deleted</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground mb-2">
                      {searchTerm && users.length === 0 ? "No users found matching your search." : "No users found."}
                    </div>
                    {searchTerm && users.length === 0 && (
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
              users.map((user: IUser, index: number) => (
                <TableRow
                  key={user._id}
                  className={index === users.length - 1 ? "border-0" : "border-b border-border/20"}
                >
                  <TableCell className="font-medium">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                  <TableCell>
                    {user.isVerified ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <UserX className="w-3 h-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.isDeleted ? (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Deleted
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
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
                          trigger="Set Active"
                          title="Activate User"
                          description={`Are you sure you want to activate user "${user.firstName} ${user.lastName}"? This will allow them to access their account and perform transactions.`}
                          confirmText="Activate User"
                          onConfirm={() => handleStatusChange(user._id, USER_STATUS.ACTIVE)}
                          confirmButtonClassName="bg-green-600 text-white hover:bg-green-700"
                          disabled={user.isActive === USER_STATUS.ACTIVE}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger="Set Inactive"
                          title="Deactivate User"
                          description={`Are you sure you want to deactivate user "${user.firstName} ${user.lastName}"? This will prevent them from accessing their account until reactivated.`}
                          confirmText="Deactivate User"
                          onConfirm={() => handleStatusChange(user._id, USER_STATUS.INACTIVE)}
                          confirmButtonClassName="bg-yellow-600 text-white hover:bg-yellow-700"
                          disabled={user.isActive === USER_STATUS.INACTIVE}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger="Block User"
                          title="Block User"
                          description={`Are you sure you want to block user "${user.firstName} ${user.lastName}"? This will permanently restrict their access and freeze all account activities.`}
                          confirmText="Block User"
                          onConfirm={() => handleStatusChange(user._id, USER_STATUS.BLOCKED)}
                          confirmButtonClassName="bg-red-600 text-white hover:bg-red-700"
                          disabled={user.isActive === USER_STATUS.BLOCKED}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger={
                            user.isDeleted ? (
                              <p className="text-primary"> Recover User</p>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </>
                            )
                          }
                          title="Are you sure?"
                          description={`This action cannot be undone. This will permanently ${
                            user.isDeleted ? "recover" : "delete"
                          } the user "${user.firstName} ${user.lastName}" ${
                            user.isDeleted ? "and restore their access to" : "and remove their data from"
                          } the system.`}
                          confirmText={user.isDeleted ? "Recover" : "Delete"}
                          onConfirm={() => handleDeleteUser(user._id, user.isDeleted)}
                          confirmButtonClassName={
                            user.isDeleted
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          }
                          triggerClassName="text-destructive focus:text-destructive"
                          isLoading={updateUserLoading}
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
        {meta && (
          <div className="mt-4 px-6 py-4 border-t border-border/40">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {meta.total > 0
                  ? `Showing ${(meta.page - 1) * meta.limit + 1}-${Math.min(meta.page * meta.limit, meta.total)} of ${
                      meta.total
                    } users`
                  : "No users found"}
              </div>

              {totalPages > 1 && (
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
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserManagementTable;
