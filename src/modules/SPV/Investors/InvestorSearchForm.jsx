import { useForm } from "react-hook-form";

import useAsyncForm from "../../Common/hooks/useAsyncForm";
import Select from "../../Common/components/Select";
import SubmitButton from "../../Common/components/SubmitButton";
import { Form, Label } from "reactstrap";
import Input from "../../Common/components/Input";

export default function InvestorSearchForm(props) {
  const { register, handleSubmit, control } = useForm({ defaultValues: props.defaultValues });
  const [onSubmit, isProcessing] = useAsyncForm(props.onSubmitFn);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Label htmlFor="searchQuery">Search Input</Label>
        <Input id="searchQuery" {...register("searchQuery")} />
      </div>

      <div className="mb-2">
        <Label htmlFor="spvId">SPV List</Label>
        <Select control={control} name="spvId" inputId="spvId" options={props.optionGroup} />
      </div>

      <div className="mb-2">
        <SubmitButton color="primary" isProcessing={isProcessing}>
          Search
        </SubmitButton>
      </div>
    </Form>
  );
}
