import { useForm } from "react-hook-form";

import useAsyncForm from "../../Common/hooks/useAsyncForm";
import Select from "../../Common/components/Select";
import SubmitButton from "../../Common/components/SubmitButton";
import { Form, Label } from "reactstrap";

export default function InvitedInvestorSearchForm(props) {
  const { handleSubmit, control } = useForm({ defaultValues: props.defaultValues });
  const [onSubmit, isProcessing] = useAsyncForm(props.onSubmitFn);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

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
