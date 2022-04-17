
import { Row, Col, CardBody, Card, Container, Form, FormFeedback, Label } from "reactstrap";
import Input from "../Common/components/Input";
import SubmitButton from "../Common/components/SubmitButton";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";

export default function ChangePassword() {

    const formSchema = Yup.object().shape({
        password: Yup.string()
          .required('old Password is required'),
        newPassword: Yup.string()
          .required('Password is required'),
        confirmPwd: Yup.string()
          .required('Password is required')
          .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
      })

    const formOptions = { resolver: yupResolver(formSchema) }
    const {register, handleSubmit, formState: { errors },} = useForm(formOptions);

    function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))
    return false
    }

    return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card>
            <div className="bg-primary bg-soft">
              <Row>
                <Col xs={7} className="align-self-center">
                  <div className="text-primary p-4">
                    <div>Change your old password</div>
                  </div>
                </Col>
              </Row>
            </div>

            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <Label htmlFor="userName">Old Password *</Label>
                  <Input id="password" type="password" autoComplete="current-password" {...register("password", { required: true })} invalid={!!errors.password} />
                  <FormFeedback type="invalid">{errors.password?.message}</FormFeedback>
                </div>

                <div className="mb-4">
                  <Label htmlFor="password">New Password *</Label>
                  <Input id="newPassword" type="password" autoComplete="current-password" {...register("newPassword")} invalid={!!errors.newPassword} />
                  <FormFeedback type="invalid">{errors.newPassword?.message}</FormFeedback>
                </div>

                <div className="mb-4">
                  <Label htmlFor="password">Confirm New Password *</Label>
                  <Input id="confirmPwd" type="password" autoComplete="current-password" {...register("confirmPwd")} invalid={!!errors.confirmPwd} />
                  <FormFeedback type="invalid">{errors.confirmPwd?.message}</FormFeedback>
                </div>

                <div className="mb-4 d-grid">
                  <SubmitButton color="primary">
                    Submit
                  </SubmitButton>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    );
}