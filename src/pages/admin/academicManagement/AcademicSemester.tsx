import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import {
  TAcademicSemester,
  TQueryParams,
} from "../../../types/academicSemester.type";
import { useState } from "react";

type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
  } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map((item) => ({
    _id: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};
export default AcademicSemester;
