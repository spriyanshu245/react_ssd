import { useForm } from "react-hook-form";
import { Form, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import Input from "../../Common/components/Input";
import SubmitButton from "../../Common/components/SubmitButton";
import useAsyncForm from "../../Common/hooks/useAsyncForm";

export default function ExpenseModal(props) {
  const { register, handleSubmit } = useForm({});
  const [onSubmit, isProcessing] = useAsyncForm(props.onAddFn);

  return (
    <Modal isOpen={props.showModal} centered>
      <ModalHeader toggle={props.toggle} tag="h4">
        Add Expense
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Label htmlFor="expenseAmount">Expense Amount</Label>
            <Input id="expenseAmount" {...register("expenseAmount")} />
          </div>

          <div className="mb-2">
            <SubmitButton color="primary" isProcessing={isProcessing}>
              Add
            </SubmitButton>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
