import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { MoreHorizontal, Trash2, UserCheck, UserX, Shield, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { IsActive } from "@/types/user.types";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";

export function UserManagementTable() {
  const { data, isLoading, isError } = useGetAllUsersQuery({
    role: "USER",
  });

  console.log(data);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get users from API data with memoization
  const userList = useMemo(() => data?.data || [], [data?.data]);

  const filteredUsers = useMemo(() => {
    const searchString = (searchTerm || "").toLowerCase();
    return userList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchString) ||
        user.lastName.toLowerCase().includes(searchString) ||
        user.email.toLowerCase().includes(searchString) ||
        user.role.toLowerCase().includes(searchString)
    );
  }, [userList, searchTerm]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  const handleStatusChange = (userId: string, newStatus: IsActive) => {
    // TODO: Implement API call to update user status
    console.log(`Updating user ${userId} status to ${newStatus}`);
  };

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement API call to delete user
    console.log(`Deleting user ${userId}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value || "");
    setCurrentPage(1);
  };

  const getStatusBadge = (status: IsActive) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "INACTIVE":
        return <Badge variant="secondary">Inactive</Badge>;
      case "BLOCKED":
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    return role === "ADMIN" ? (
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

  return (
    <Card className="p-5">
      <CardHeader className="border-b border-border/40">
        <CardTitle className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <span>Users ({filteredUsers.length})</span>
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
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground mb-2">
                      {filteredUsers.length === 0 && userList.length > 0
                        ? "No users found matching your search."
                        : "No users found."}
                    </div>
                    {filteredUsers.length === 0 && userList.length > 0 && (
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
              paginatedUsers.map((user, index) => (
                <TableRow
                  key={user._id}
                  className={index === paginatedUsers.length - 1 ? "border-0" : "border-b border-border/20"}
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
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user._id, "ACTIVE")}
                          disabled={user.isActive === "ACTIVE"}
                        >
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user._id, "INACTIVE")}
                          disabled={user.isActive === "INACTIVE"}
                        >
                          Set Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(user._id, "BLOCKED")}
                          disabled={user.isActive === "BLOCKED"}
                        >
                          Block User
                        </DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user "{user.firstName}{" "}
                                {user.lastName}" and remove their data from the system.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/40">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
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
                  const pageNum = i + 1;
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
        }
      </CardContent>
    </Card>
  );
}

export default UserManagementTable;
