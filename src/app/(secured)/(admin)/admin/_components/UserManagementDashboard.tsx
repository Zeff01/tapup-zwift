"use client";

import { useState, useMemo, useEffect } from "react";
import { ExtendedUserInterface } from "@/types/types";
import { 
  Users, 
  UserCog,
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Mail,
  Calendar,
  CreditCard,
  Activity,
  Shield,
  Ban,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Phone,
  MapPin,
  Building,
  Hash,
  SlidersHorizontal,
  X,
  UserCheck,
  UserX,
  ShieldCheck,
  ShieldOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { updateUserRole } from "@/lib/firebase/actions/user.action";

interface UserManagementDashboardProps {
  users: ExtendedUserInterface[];
  currentUser: ExtendedUserInterface;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, description, color }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                  {trend.value}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserManagementDashboard({ 
  users, 
  currentUser 
}: UserManagementDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<"users" | "admins">("users");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ExtendedUserInterface | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Separate users and admins
  const admins = users.filter(user => user.role === "admin");
  const regularUsers = users.filter(user => user.role !== "admin");

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = users.length;
    const totalAdmins = admins.length;
    const totalUsers = regularUsers.length;
    const activeUsers = users.filter(u => u.onboarding).length;
    const verifiedUsers = users.filter(u => u.email).length; // Count users with email as verified
    const withCards = users.filter(u => u.printStatus).length;
    
    // Calculate trends (mock data - replace with actual historical data)
    const userGrowth = 12.5; // percentage
    const activeGrowth = 8.3;
    
    return {
      total,
      totalAdmins,
      totalUsers,
      activeUsers,
      verifiedUsers,
      withCards,
      userGrowth,
      activeGrowth,
    };
  }, [users, admins, regularUsers]);

  // Filter users based on selected tab and filters
  const filteredUsers = useMemo(() => {
    let filtered = selectedTab === "users" ? regularUsers : admins;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter (for users tab)
    if (roleFilter !== "all" && selectedTab === "users") {
      filtered = filtered.filter(user => {
        if (roleFilter === "premium") return user.printStatus;
        if (roleFilter === "basic") return !user.printStatus;
        return true;
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(user => {
        const hasCompletedOnboarding = user.onboarding;
        const hasCards = user.printStatus;
        const hasProfile = user.firstName && user.lastName && user.company;
        
        if (statusFilter === "active") {
          return hasCompletedOnboarding && (hasCards || hasProfile);
        }
        if (statusFilter === "partial") {
          return hasCompletedOnboarding && !hasCards && !hasProfile;
        }
        if (statusFilter === "inactive") {
          return !hasCompletedOnboarding;
        }
        return true;
      });
    }

    // Verification filter
    if (verificationFilter !== "all") {
      filtered = filtered.filter(user => {
        if (verificationFilter === "verified") return !!user.email;
        if (verificationFilter === "unverified") return !user.email;
        return true;
      });
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => {
      // Mock sorting - replace with actual date field
      return 0;
    });

    return filtered;
  }, [selectedTab, regularUsers, admins, searchTerm, roleFilter, statusFilter, verificationFilter]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id).filter((id): id is string => id !== undefined)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleRoleUpdate = async (userId: string, newRole: "user" | "admin") => {
    setIsUpdating(userId);
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update user role");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.size === 0) {
      toast.error("No users selected");
      return;
    }

    // Implement bulk actions
    switch (action) {
      case "email":
        toast.info(`Send email to ${selectedUsers.size} users`);
        break;
      case "export":
        toast.info(`Export ${selectedUsers.size} users`);
        break;
      case "deactivate":
        toast.warning(`Deactivate ${selectedUsers.size} users`);
        break;
    }
  };

  const getUserStatusBadge = (user: ExtendedUserInterface) => {
    if (user.role === "admin") {
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">Admin</Badge>;
    }
    if (user.printStatus) {
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Premium</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Basic</Badge>;
  };

  const getVerificationBadge = (user: ExtendedUserInterface) => {
    if (user.email) {
      return (
        <Badge variant="outline" className="gap-1 text-xs border-green-500 text-green-700 dark:text-green-400">
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="gap-1 text-xs border-yellow-500 text-yellow-700 dark:text-yellow-400">
        <AlertCircle className="w-3 h-3" />
        Unverified
      </Badge>
    );
  };

  const getActivityStatus = (user: ExtendedUserInterface) => {
    // Check multiple factors for activity status
    const hasCompletedOnboarding = user.onboarding;
    const hasCards = user.printStatus;
    const isVerified = !!user.email;
    const hasProfile = user.firstName && user.lastName && user.company;
    
    // If user has lastActiveAt timestamp (would need to add this field)
    // const lastActive = user.lastActiveAt;
    // const daysSinceActive = lastActive ? 
    //   Math.floor((Date.now() - lastActive.toDate().getTime()) / (1000 * 60 * 60 * 24)) : null;
    
    // Determine activity based on multiple factors
    if (hasCompletedOnboarding && (hasCards || hasProfile)) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
      );
    } else if (hasCompletedOnboarding) {
      return (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <span className="text-xs text-muted-foreground">Partial</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
        <span className="text-xs text-muted-foreground">Inactive</span>
      </div>
    );
  };

  return (
    <div className="py-4 px-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserCog className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Users"
          value={statistics.total}
          icon={<Users className="w-4 h-4 text-white" />}
          color="bg-primary"
          trend={{ value: statistics.userGrowth, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value={statistics.activeUsers}
          icon={<Activity className="w-4 h-4 text-white" />}
          color="bg-green-500"
          description={`${Math.round((statistics.activeUsers / statistics.total) * 100)}% of total`}
        />
        <StatCard
          title="Verified"
          value={statistics.verifiedUsers}
          icon={<CheckCircle2 className="w-4 h-4 text-white" />}
          color="bg-blue-500"
          description={`${Math.round((statistics.verifiedUsers / statistics.total) * 100)}% verified`}
        />
        <StatCard
          title="Admins"
          value={statistics.totalAdmins}
          icon={<Shield className="w-4 h-4 text-white" />}
          color="bg-purple-500"
          description={`${statistics.totalUsers} regular users`}
        />
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users ({statistics.totalUsers})
            </TabsTrigger>
            <TabsTrigger value="admins" className="gap-2">
              <Shield className="w-4 h-4" />
              Admins ({statistics.totalAdmins})
            </TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
            
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {(roleFilter !== "all" || statusFilter !== "all" || verificationFilter !== "all") && (
                    <Badge variant="secondary" className="ml-1 px-1">
                      {[roleFilter, statusFilter, verificationFilter].filter(f => f !== "all").length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Filters</h4>
                    <Separator />
                  </div>
                  
                  {selectedTab === "users" && (
                    <div className="space-y-2">
                      <Label className="text-xs">User Type</Label>
                      <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="premium">Premium Users</SelectItem>
                          <SelectItem value="basic">Basic Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="partial">Partially Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Verification</Label>
                    <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="unverified">Unverified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRoleFilter("all");
                        setStatusFilter("all");
                        setVerificationFilter("all");
                      }}
                    >
                      Clear All
                    </Button>
                    <Button size="sm" onClick={() => setShowFilters(false)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {selectedUsers.size > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Actions ({selectedUsers.size})
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleBulkAction("email")}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleBulkAction("deactivate")}
                    className="text-red-600"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Deactivate Users
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Users Table */}
        <TabsContent value="users" className="mt-0">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Cards</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="space-y-2">
                        <Users className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">No users found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.filter(user => user.id).map((user) => (
                    <TableRow key={user.id!} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.has(user.id!)}
                          onCheckedChange={(checked) => handleSelectUser(user.id!, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.profilePictureUrl} />
                            <AvatarFallback>
                              {user.firstName?.[0]}{user.lastName?.[0]}
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
                      <TableCell>
                        {getActivityStatus(user)}
                      </TableCell>
                      <TableCell>
                        {getUserStatusBadge(user)}
                      </TableCell>
                      <TableCell>
                        {getVerificationBadge(user)}
                      </TableCell>
                      <TableCell>
                        {user.printStatus ? (
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Has cards</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No cards</span>
                        )}
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
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={isUpdating === user.id!}
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleRoleUpdate(user.id!, "admin")}>
                              <ShieldCheck className="w-4 h-4 mr-2" />
                              Make Admin
                            </DropdownMenuItem>
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
        </TabsContent>

        {/* Admins Table */}
        <TabsContent value="admins" className="mt-0">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
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
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="space-y-2">
                        <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">No admins found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.filter(user => user.id).map((user) => (
                    <TableRow key={user.id!} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.has(user.id!)}
                          onCheckedChange={(checked) => handleSelectUser(user.id!, checked as boolean)}
                          disabled={user.id === currentUser?.id}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-purple-500/20">
                            <AvatarImage src={user.profilePictureUrl} />
                            <AvatarFallback className="bg-purple-100 text-purple-700">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                              {user.firstName} {user.lastName}
                              {user.id === currentUser?.id && (
                                <Badge variant="secondary" className="text-xs">You</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          <Shield className="w-3 h-3 mr-1" />
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getActivityStatus(user)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">All Access</Badge>
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
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={isUpdating === user.id!}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleRoleUpdate(user.id!, "user")}
                                className="text-orange-600"
                              >
                                <ShieldOff className="w-4 h-4 mr-2" />
                                Remove Admin
                              </DropdownMenuItem>
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
        </TabsContent>
      </Tabs>

      {/* User Details Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete information about the user account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Header */}
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedUser.profilePictureUrl} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.firstName?.[0]}{selectedUser.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 pt-2">
                    {getUserStatusBadge(selectedUser)}
                    {getVerificationBadge(selectedUser)}
                    {getActivityStatus(selectedUser)}
                  </div>
                </div>
              </div>

              <Separator />

              {/* User Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">User ID</Label>
                  <p className="text-sm font-medium">{selectedUser.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Phone</Label>
                  <p className="text-sm">{selectedUser.number || "Not provided"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Company</Label>
                  <p className="text-sm">{selectedUser.company || "Not provided"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Position</Label>
                  <p className="text-sm">{selectedUser.position || "Not provided"}</p>
                </div>
                {selectedUser.user_link && (
                  <div className="space-y-2 col-span-2">
                    <Label className="text-muted-foreground text-xs">Profile Link</Label>
                    <p className="text-sm">
                      <a 
                        href={selectedUser.user_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {selectedUser.user_link}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Account Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>Role: {selectedUser.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span>Cards: {selectedUser.printStatus ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <span>Onboarding: {selectedUser.onboarding ? "Complete" : "Pending"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>Email: {selectedUser.email ? "Verified" : "Unverified"}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
              <Button onClick={() => {
                setSelectedUser(null);
                toast.info("Opening user profile...");
              }}>
                View Full Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}