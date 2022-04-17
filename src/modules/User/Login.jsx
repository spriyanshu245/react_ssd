import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../App/AuthProvider";

import { Row, Col, CardBody, Card, Container, Form, FormFeedback, Label } from "reactstrap";
import Input from "../Common/components/Input";
import SubmitButton from "../Common/components/SubmitButton";

import profile from "../../assets/images/profile-img.png";

import useAsyncForm from "../Common/hooks/useAsyncForm";
import { useForm } from "react-hook-form";

import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  const [onSubmit, isProcessing] = useAsyncForm(onSubmitFn);

  const schema = object({
    userName: string().required().label("Username"),
    password: string().required().label("Password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmitFn(data) {
    let user = await auth.api.post("Account/authentication", data);
    auth.setUser(user);

    let from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
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
                    <h5 className="text-primary">Welcome!</h5>
                    <div>Sign in to continue to SPV Hub</div>
                  </div>
                </Col>
                <Col xs={5} className="align-self-end">
                  <img src={profile} alt="" className="img-fluid" />
                </Col>
              </Row>
            </div>

            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <Label htmlFor="userName">Email *</Label>
                  <Input id="userName" type="email" autoComplete="username" {...register("userName", { required: true })} invalid={!!errors.userName} />
                  <FormFeedback type="invalid">{errors.userName?.message}</FormFeedback>
                </div>

                <div className="mb-4">
                  <Label htmlFor="password">Password *</Label>
                  <Input id="password" type="password" autoComplete="current-password" {...register("password")} invalid={!!errors.password} />
                  <FormFeedback type="invalid">{errors.password?.message}</FormFeedback>
                </div>

                <div className="mb-4 d-grid">
                  <SubmitButton color="primary" isProcessing={isProcessing}>
                    Log In
                  </SubmitButton>
                </div>

                {/* <div className="text-center">
                  <Link to="/forget-password" className="text-muted">
                    <i className="mdi mdi-lock me-1" />
                    Having trouble signing in?
                  </Link>
                </div> */}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
