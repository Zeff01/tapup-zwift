"use client";

import { Card } from "@/types/types";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const TableComponent = ({ users }: { users: Card[] }) => {
  return <DataTable columns={columns} data={users} />;
};

export default TableComponent;
