"use client";

import { Users } from "@/src/lib/firebase/store/users.type";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const TableComponent = ({
  users,
  isLoading,
}: {
  users: Users[];
  isLoading: boolean;
}) => {
  return <DataTable columns={columns} data={users} isLoading={isLoading} />;
};

export default TableComponent;
