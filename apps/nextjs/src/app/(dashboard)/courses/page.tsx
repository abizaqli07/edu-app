"use client"

import { api } from "~/utils/api";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = () => {

  const { data: courses, isLoading, isError } = api.admin.course.getAll.useQuery()

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  if (courses === undefined || isError) {
    return (
      <div>error...</div>
    )
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default CoursesPage;