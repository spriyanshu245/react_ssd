import { Row, Col, CardTitle, Form, Label } from "reactstrap";

import useAsyncForm from "../../Common/hooks/useAsyncForm";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../App/AuthProvider";

import Input from "../../Common/components/Input";
import Select from "../../Common/components/Select";
import SubmitButton from "../../Common/components/SubmitButton";
import CustomFlatPickr from "../../Common/components/CustomFlatPickr";
// import Dropzone from "../../Common/components/Dropzone";

export default function UpsertSPVForm(props) {
  const auth = useAuth();
  const selectValues = props.selectValues;
  const { register, handleSubmit, control } = useForm({ defaultValues: props.defaultValues });
  const [onSubmit, isProcessing] = useAsyncForm(onSubmitFn);

  async function onSubmitFn(data) {
    await auth.api.post("Spv/CreateSPV?roleName=" + auth.user.role, data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CardTitle className="mb-4">Basic Data</CardTitle>

      <div>
        <Row>
          <Col xs="6">
            <div className="mb-3">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" {...register("companyName")} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="spvTitle">SPV Title *</Label>
              <Input id="spvTitle" {...register("spvTitle")} />
            </div>
          </Col>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="spvType">SPV Type *</Label>
              <Select control={control} name="spvType" inputId="spvType" options={selectValues.spvType} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="spvOption">SPV Option *</Label>
              <Select control={control} name="spvOption" inputId="spvOption" options={selectValues.spvOption} />
            </div>
          </Col>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="operatingAgreementYear">Agreement Tenure *</Label>
              <Input id="operatingAgreementYear" {...register("operatingAgreementYear")} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="targetRaise">Target Raise (USD) *</Label>
              <Input id="targetRaise" {...register("targetRaise")} />
            </div>
          </Col>

          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="minimumInvestment">Minimum Investment (USD) *</Label>
              <Input id="minimumInvestment" {...register("minimumInvestment")} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="dealDeadlineDate">Deal Deadline Date</Label>
              <Controller name="dealDeadlineDate" control={control} rules={{ required: true }} render={({ field }) => <CustomFlatPickr id="dealDeadlineDate" className="form-control d-block" placeholder="dd M,yyyy" {...field} />} />
              {/* <CustomFlatPickr id="dealDeadlineDate" name="dealDeadlineDate" className="form-control d-block" placeholder="dd M,yyyy" /> */}
            </div>
          </Col>

          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="assetTypeOfSecurityId">Asset type of security</Label>
              <Select control={control} name="assetTypeOfSecurityId" inputId="assetTypeOfSecurityId" options={selectValues.asset} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="organizerName">Organizer Name*</Label>
              <Input id="organizerName" {...register("organizerName")} />
            </div>
          </Col>

          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="organizerGroup">Organizer Group</Label>
              <Input id="organizerGroup" {...register("organizerGroup")} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="organizerState">Organizer State*</Label>
              <Input id="organizerState" {...register("organizerState")} />
            </div>
          </Col>

          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="email">Email*</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="phoneNumber">Phone*</Label>
              <Input id="phoneNumber" type="tel" {...register("phoneNumber")} />
            </div>
          </Col>

          <Col md="6">
            <div className="mb-3">
              <Label htmlFor="statusId">Status*</Label>
              <Select control={control} name="statusId" inputId="statusId" options={selectValues.status} />
            </div>
          </Col>
        </Row>
      </div>

      <CardTitle className="mb-4">Deal Documents</CardTitle>

      {/* <Dropzone /> */}

      <SubmitButton isProcessing={isProcessing}>Save</SubmitButton>
    </Form>
  );
}
