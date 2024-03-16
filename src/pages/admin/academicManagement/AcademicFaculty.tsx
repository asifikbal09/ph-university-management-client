import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
type TTableData = {
  name: string;
};

const AcademicFaculty = () => {
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);

  const facultyTableData = facultyData?.data?.map((item) => {
    return { name: item.name };
  });

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log(filters, extra);
  };

  return <Table columns={columns} dataSource={facultyTableData} onChange={onChange} />;
};
export default AcademicFaculty;
