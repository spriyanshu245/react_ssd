import { useForm } from "react-hook-form";
import { Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Input from "../../Common/components/Input";
import Select from "../../Common/components/Select";
import SubmitButton from "../../Common/components/SubmitButton";
import useAsyncForm from "../../Common/hooks/useAsyncForm";

export default function InviteForm(props) {
  const { register, handleSubmit, control } = useForm({ defaultValues: props.defaultValues });
  const [onSubmit, isProcessing] = useAsyncForm(onSubmitFn);
  const optionGroup = [
    {
      value: 15,
      label: "Test SPV",
    },
    {
      value: 16,
      label: "TGA",
    },
  ];
  function onSubmitFn(data) {
    console.log(data);
  }

  return (
    <Modal isOpen={props.show} toggle={props.toggle} centered>
      <ModalHeader toggle={props.toggle} tag="h4">
        Add Expense
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6">
              <div className="mb-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
            </Col>

            <Col md="6">
              <div className="mb-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" {...register("lastName")} />
              </div>
            </Col>
          </Row>

          <div className="mb-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
          </div>

          <Row>
            <Col md="3">
              <div className="mb-2">
                <Label htmlFor="countryCode">Country Code *</Label>
                <Select control={control} name="countryCode" inputId="countryCode" options={optionGroup} />
              </div>
            </Col>

            <Col md="9">
              <div className="mb-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" {...register("phone")} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <div className="mb-2">
                <Label htmlFor="commitmentAmount">Commitment (USD)</Label>
                <Input id="commitmentAmount" {...register("commitmentAmount")} />
              </div>
            </Col>

            <Col md="6">
              <div className="mb-2">
                <Label htmlFor="expenses">Expenses (USD)</Label>
                <Input id="expenses" {...register("expenses")} />
              </div>
            </Col>
          </Row>

          <div className="mb-2">
            <SubmitButton color="primary" isProcessing={isProcessing}>
              Save
            </SubmitButton>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
