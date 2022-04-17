import { useForm } from "react-hook-form";
import { Button, Form, Label } from "reactstrap";
import Input from "../../Common/components/Input";
import Select from "../../Common/components/Select";
import SubmitButton from "../../Common/components/SubmitButton";
import useAsyncForm from "../../Common/hooks/useAsyncForm";

export default function SearchSPVForm(props) {
  const { register, handleSubmit, control, reset } = useForm();
  const [onSubmit, isProcessing] = useAsyncForm(props.onSubmitFn);

  function resetForm() {
    reset({
      searchQuery: "",
      typeSecurityId: 0,
      statusId : 0
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Label htmlFor="searchQuery">Search Input</Label>
        <Input id="searchQuery" {...register("searchQuery")} />
      </div>

      <div className="mb-2">
        <Label htmlFor="typeSecurityId">Asset type of security</Label>
        <Select control={control} inputId="typeSecurityId" name="typeSecurityId" options={props.optionGroup.asset} />
      </div>

      <div className="mb-2">
        <Label htmlFor="statusId">Status</Label>
        <Select control={control} inputId="statusId" name="statusId" options={props.optionGroup.status} />
      </div>

      <div className="mb-2">
        <SubmitButton color="primary" isProcessing={isProcessing}>
          Search
        </SubmitButton>
        {/* <Button className="mx-5" color="primary" onClick={resetForm}>
          Reset
        </Button> */}
      </div>
    </Form>
  );
}
