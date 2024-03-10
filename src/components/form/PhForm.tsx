import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromConfig={
    defaultValues?:Record<string,any>
}

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}&TFromConfig;

const PhForm = ({ onSubmit, children, defaultValues }: TFromProps) => {
  const formConfig :TFromConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
export default PhForm;
