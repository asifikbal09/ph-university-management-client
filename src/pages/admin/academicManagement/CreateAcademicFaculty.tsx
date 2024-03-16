import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Faculty created.");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhInput type="text" label="Name" name="name" />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};
export default CreateAcademicFaculty;
