import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@/redux/features/user/user.api";
import type { IsActive, IUser, TRole } from "@/types/user.types";
import { USER_STATUS, USER_ROLES } from "@/constants/user.constants";
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Shield, Trash2, UserCheck, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function AgentManagementTable() {
  const [updateUserFn, { isLoading: updateUserLoading }] = useUpdateUserMutation();

  const { data, isLoading, isError } = useGetAllUsersQuery({
    role: USER_ROLES.AGENT,
  });

  console.log(data);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const agentList = useMemo(() => (data?.data as IUser[]) || [], [data?.data]);

  const filteredAgents = useMemo(() => {
    const searchString = (searchTerm || "").toLowerCase();
    return agentList.filter(
      (agent: IUser) =>
        agent.firstName.toLowerCase().includes(searchString) ||
        agent.lastName.toLowerCase().includes(searchString) ||
        agent.email.toLowerCase().includes(searchString) ||
        agent.role.toLowerCase().includes(searchString) ||
        agent._id.toLowerCase().includes(searchString)
    );
  }, [agentList, searchTerm]);

  const paginatedAgents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAgents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAgents, currentPage]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const handleStatusChange = async (agentId: string, newStatus: IsActive) => {
    console.log(`Updating agent ${agentId} status to ${newStatus}`);

    const updateData = {
      isActive: newStatus,
    };

    try {
      const res = await updateUserFn({ id: agentId, data: updateData }).unwrap();

      if (res.success) {
        toast.success("Agent status updated successfully.");
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      toast.error("Failed to update agent status.");
    }
  };

  const handleDeleteAgent = async (agentId: string, isDeleted: boolean) => {
    console.log(`Updating agent ${agentId} delete status to ${!isDeleted}`);

    const updateData = {
      isDeleted: !isDeleted,
    };

    try {
      const res = await updateUserFn({ id: agentId, data: updateData }).unwrap();
      if (res.success) {
        toast.success(`Agent ${!isDeleted ? "deleted" : "recovered"} successfully.`);
      }
    } catch (error) {
      console.error("Error updating agent delete status:", error);
      toast.error(`Failed to ${!isDeleted ? "delete" : "recover"} agent.`);
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
    return role === USER_ROLES.AGENT ? (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
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
            <span>Loading Agents...</span>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search agents..." disabled className="pl-10" />
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
              <p className="text-destructive mb-2">Error loading agents</p>
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
          <span>Agents ({filteredAgents.length})</span>
          <div className="relative md:w-80 mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search agents..."
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
            {paginatedAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-muted-foreground mb-2">
                      {filteredAgents.length === 0 && agentList.length > 0
                        ? "No agents found matching your search."
                        : "No agents found."}
                    </div>
                    {filteredAgents.length === 0 && agentList.length > 0 && (
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
              paginatedAgents.map((agent: IUser, index: number) => (
                <TableRow
                  key={agent._id}
                  className={index === paginatedAgents.length - 1 ? "border-0" : "border-b border-border/20"}
                >
                  <TableCell className="font-medium">
                    {agent.firstName} {agent.lastName}
                  </TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{getRoleBadge(agent.role)}</TableCell>
                  <TableCell>{getStatusBadge(agent.isActive)}</TableCell>
                  <TableCell>
                    {agent.isVerified ? (
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
                    {agent.isDeleted ? (
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
                  <TableCell className="text-sm text-muted-foreground">{formatDate(agent.createdAt)}</TableCell>
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
                          title="Activate Agent"
                          description={`Are you sure you want to activate agent "${agent.firstName} ${agent.lastName}"? This will allow them to access their account and perform agent-related operations.`}
                          confirmText="Activate Agent"
                          onConfirm={() => handleStatusChange(agent._id, USER_STATUS.ACTIVE)}
                          confirmButtonClassName="bg-green-600 text-white hover:bg-green-700"
                          disabled={agent.isActive === USER_STATUS.ACTIVE}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger="Set Inactive"
                          title="Deactivate Agent"
                          description={`Are you sure you want to deactivate agent "${agent.firstName} ${agent.lastName}"? This will prevent them from accessing their account until reactivated.`}
                          confirmText="Deactivate Agent"
                          onConfirm={() => handleStatusChange(agent._id, USER_STATUS.INACTIVE)}
                          confirmButtonClassName="bg-yellow-600 text-white hover:bg-yellow-700"
                          disabled={agent.isActive === USER_STATUS.INACTIVE}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger="Block Agent"
                          title="Block Agent"
                          description={`Are you sure you want to block agent "${agent.firstName} ${agent.lastName}"? This will permanently restrict their access and freeze all account activities.`}
                          confirmText="Block Agent"
                          onConfirm={() => handleStatusChange(agent._id, USER_STATUS.BLOCKED)}
                          confirmButtonClassName="bg-red-600 text-white hover:bg-red-700"
                          disabled={agent.isActive === USER_STATUS.BLOCKED}
                          isLoading={updateUserLoading}
                        />

                        <ConfirmationDialog
                          trigger={
                            agent.isDeleted ? (
                              <p className="text-primary"> Recover Agent</p>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Agent
                              </>
                            )
                          }
                          title="Are you sure?"
                          description={`This action cannot be undone. This will permanently ${
                            agent.isDeleted ? "recover" : "delete"
                          } the agent "${agent.firstName} ${agent.lastName}" ${
                            agent.isDeleted ? "and restore their access to" : "and remove their data from"
                          } the system.`}
                          confirmText={agent.isDeleted ? "Recover" : "Delete"}
                          onConfirm={() => handleDeleteAgent(agent._id, agent.isDeleted)}
                          confirmButtonClassName={
                            agent.isDeleted
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

        {/* Pagination  */}
        {
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/40">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredAgents.length)} of {filteredAgents.length} results
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

export default AgentManagementTable;
