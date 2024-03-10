import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();

  const defaultValues = {
    userId: "A-0002",
    password: "asif1234",
  };
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully.", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something want wrong!", { id: toastId, duration: 2000 });
    }
  };

  console.log(error);

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type="text" name="userId" label="ID : "></PhInput>

        <PhInput type="text" name="password" label="Password : "></PhInput>

        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
