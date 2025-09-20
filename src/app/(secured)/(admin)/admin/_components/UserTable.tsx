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
import {
  Building,
  CreditCard,
  Eye,
  Hash,
  Mail,
  MoreVertical,
  ShieldCheck,
  Users,
  UserX,
} from "lucide-react";
import { ExtendedUserInterface } from "@/types/types";
import { SetStateAction, useState } from "react";

interface UserTableProps {
  selectedUsers: Set<string>;
  filteredUsers: ExtendedUserInterface[];
  isUpdating: string | null;
  currentUser: ExtendedUserInterface;
  handleSelectAll: (checked: boolean) => void;
  handleSelectUser: (userId: string, checked: boolean) => void;
  getActivityStatus: (user: ExtendedUserInterface) => JSX.Element;
  getUserStatusBadge: (user: ExtendedUserInterface) => JSX.Element;
  getVerificationBadge: (user: ExtendedUserInterface) => JSX.Element;
  setSelectedUser: (
    value: SetStateAction<ExtendedUserInterface | null>
  ) => void;
  handleRoleUpdate: (
    userId: string,
    newRole: "user" | "admin"
  ) => Promise<void>;
}

const UserTable = ({
  selectedUsers,
  filteredUsers,
  isUpdating,
  currentUser,
  handleSelectAll,
  handleSelectUser,
  getActivityStatus,
  getUserStatusBadge,
  getVerificationBadge,
  setSelectedUser,
  handleRoleUpdate,
}: UserTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 20;
  const indexOfLastCard = currentPage * usersPerPage;
  const indexOfFirstCard = indexOfLastCard - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);
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
                    selectedUsers.size === currentUsers.length &&
                    currentUsers.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Cards</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="space-y-2">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentUsers
                .filter((user) => user.id)
                .map((user) => (
                  <TableRow key={user.id!} className="group">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(user.id!)}
                        onCheckedChange={(checked) =>
                          handleSelectUser(user.id!, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.profilePictureUrl} />
                          <AvatarFallback>
                            {user.firstName?.[0]}
                            {user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            {user.id!}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getActivityStatus(user)}</TableCell>
                    <TableCell>{getUserStatusBadge(user)}</TableCell>
                    <TableCell>{getVerificationBadge(user)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {user.cardCount || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {user.company && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building className="w-3 h-3" />
                            {user.company}
                          </div>
                        )}
                        {user.position && (
                          <div className="text-xs text-muted-foreground">
                            {user.position}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
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
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          {currentUser.role === "super_admin" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleUpdate(user.id!, "admin")
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="w-4 h-4 mr-2" />
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex items-center justify-center my-12">
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

export default UserTable;
