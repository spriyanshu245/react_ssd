import { useForm } from "react-hook-form";
import { CardTitle, Col, Form, Label, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
import Input from "../../Common/components/Input";
import SubmitButton from "../../Common/components/SubmitButton";
import CustomFlatPickr from "../../Common/components/CustomFlatPickr";
import useAsyncForm from "../../Common/hooks/useAsyncForm";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useAuth } from "../../App/AuthProvider";

// import { find } from "lodash";

export default function WireAmountModal(props) {
  let auth = useAuth();

  const { register, handleSubmit, setValue } = useForm({});
  const [onSubmit, isProcessing] = useAsyncForm(onAddFn);
  let bankDropDown = props.wireDetails?.bankDropDown;
  let bankDetails = props.wireDetails?.spvBankModels;
  let wireAmounts = props.wireDetails?.spvWiredAmtDisplayModel;

  async function onAddFn(data) {
    data.spvId = props.wireDetails.spvId;
    data.investmentProfileId = props.wireDetails.investmentId;
    data.investorUserId = props.wireDetails.investorUserId;
    data.wiredAmountInDecimal = parseFloat(data.wiredAmount);
    data.wireDate = "2022-04-13T18:24:03.066Z";

    await auth.api.post("Spv/AddWireAmount", data);

    props.onAddFn();
  }

  if (bankDropDown && bankDropDown.length) setBankDetails(bankDropDown[0]);

  function setBankDetails(bank) {
    let temp = bankDetails.find((b) => b.bankId == bank.value);
    setValue("bankName", temp.bankName);
    setValue("accountNumber", temp.accountNumber);
    setValue("nameOnAccount", temp.nameOnAccount);
    setValue("routingNumber", temp.routingNumber);
  }

  return (
    <Modal isOpen={props.showModal} centered size="lg">
      <ModalHeader toggle={props.toggle} tag="h4">
        Wire Amount
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="bank">Bank Details *</Label>
                  <Select name="bank" inputId="bank" options={bankDropDown} defaultValue={bankDropDown && bankDropDown.length && bankDropDown[0]} onChange={setBankDetails} />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="wiredAmount">Amount *</Label>
                  <Input id="wiredAmount" {...register("wiredAmount")} />
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="wireDate">Wire Date *</Label>
                  <CustomFlatPickr id="wireDate" name="wireDate" className="form-control d-block" placeholder="dd M,yyyy" />
                </div>
              </Col>
            </Row>
          </div>
          <CardTitle className="mb-4">Bank Details</CardTitle>
          <div>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input id="bankName" {...register("bankName")} disabled />
                </div>
              </Col>

              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="nameOnAccount">Name On Account *</Label>
                  <Input id="nameOnAccount" {...register("nameOnAccount")} disabled />
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input id="routingNumber" {...register("routingNumber")} disabled />
                </div>
              </Col>

              <Col md="6">
                <div className="mb-3">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input id="accountNumber" {...register("accountNumber")} disabled />
                </div>
              </Col>
            </Row>
          </div>

          <div className="mb-2 text-end">
            <SubmitButton color="primary" isProcessing={isProcessing}>
              Save
            </SubmitButton>
          </div>
        </Form>
        <div className="table-responsive">
          <Table className="bg-white align-middle table-border">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Bank Details</th>
                <th scope="col">Received Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {wireAmounts &&
                wireAmounts.length &&
                wireAmounts.map((wire, index) => (
                  <tr key={index}>
                    <td>{wire.amount}</td>
                    <td>{wire.bankName}</td>
                    <td>{wire.receivedDate}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <Link className="text-success" to="#">
                          <i className="mdi mdi-pencil font-size-18" id="edittooltip" onClick={() => handleEditWire(wire)}></i>
                        </Link>
                        <Link className="text-danger" to="#">
                          <i className="mdi mdi-delete font-size-18" id="deletetooltip" onClick={() => onClickDelete(wire)}></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </ModalBody>
    </Modal>
  );

  function handleEditWire(wire) {
    console.log(wire);
  }

  function onClickDelete(wire) {
    console.log(wire.wiredId);
  }
}
