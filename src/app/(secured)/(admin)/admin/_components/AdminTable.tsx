import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Mail, MoreVertical, Shield, ShieldOff } from "lucide-react";
import { ExtendedUserInterface } from "@/types/types";
import { SetStateAction, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AdminTableProps {
  selectedUsers: Set<string>;
  filteredUsers: ExtendedUserInterface[];
  isUpdating: string | null;
  currentUser: ExtendedUserInterface;
  handleSelectAll: (checked: boolean) => void;
  handleSelectUser: (userId: string, checked: boolean) => void;
  getActivityStatus: (user: ExtendedUserInterface) => JSX.Element;
  setSelectedUser: (
    value: SetStateAction<ExtendedUserInterface | null>
  ) => void;
  handleRoleUpdate: (
    userId: string,
    newRole: "user" | "admin"
  ) => Promise<void>;
}

const AdminTable = ({
  selectedUsers,
  filteredUsers,
  currentUser,
  isUpdating,
  handleSelectAll,
  handleSelectUser,
  getActivityStatus,
  setSelectedUser,
  handleRoleUpdate,
}: AdminTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 20;
  const indexOfLastCard = currentPage * usersPerPage;
  const indexOfFirstCard = indexOfLastCard - usersPerPage;
  const currentAdmins = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedUsers.size === currentAdmins.length &&
                    currentAdmins.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAdmins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="space-y-2">
                    <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">No admins found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentAdmins
                .filter((user) => user.id)
                .map((user) => (
                  <TableRow key={user.id!} className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(user.id!)}
                        onCheckedChange={(checked) =>
                          handleSelectUser(user.id!, checked as boolean)
                        }
                        disabled={user.id === currentUser?.id}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-purple-500/20">
                          <AvatarImage src={user.profilePictureUrl} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {user.firstName?.[0]}
                            {user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            {user.firstName} {user.lastName}
                            {user.id === currentUser?.id && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === "super_admin" ? (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          <Shield className="w-3 h-3 mr-1" />
                          Super Admin
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getActivityStatus(user)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          All Access
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        Recently active
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.id !== currentUser?.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={isUpdating === user.id!}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedUser(user)}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            {currentUser.role === "super_admin" &&
                              user.role !== "super_admin" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRoleUpdate(user.id!, "user")
                                    }
                                    className="text-orange-600"
                                  >
                                    <ShieldOff className="w-4 h-4 mr-2" />
                                    Remove Admin
                                  </DropdownMenuItem>
                                </>
                              )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex items-center justify-center mt-12">
          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={pageNumber === currentPage}
                        className={`select-none ${pageNumber === currentPage ? "bg-green-600 hover:bg-green-600 text-white" : "hover:bg-green-500/10"}`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${pageNumber}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default AdminTable;
