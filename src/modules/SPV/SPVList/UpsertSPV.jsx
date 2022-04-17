import { useCallback, useState } from "react";
import { useParams } from "react-router";

import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useAuth } from "../../App/AuthProvider";
import useAsync from "../../Common/hooks/useAsync";
import UpsertSPVForm from "./UpsertSPVForm";
import Loader from "../../Common/components/Loader";

export default function UpsertSPV() {
  const params = useParams();
  const auth = useAuth();

  let [selectValues, setSelectValues] = useState({});
  let [spvData, setSpvData] = useState({});
  let [companyList, setCompanyList] = useState({});

  const cachedGetData = useCallback(getData, [auth.api, params]);
  const [isLoading] = useAsync(cachedGetData, true);

  async function getData() {
    let response = await Promise.all([auth.api.get("Spv/PopulateCreateSpvDropdown"), auth.api.get("Spv/GetAllSPVCompaniesForDropdown"), auth.api.get("Spv/GetSPVBySpvId", { params })]);

    setSelectValues(response[0]);
    setCompanyList(response[1]);
    setSpvData(response[2]);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Manage SPV</h4>
          </div>

          <Card>
            <CardBody>{isLoading ? <Loader /> : <UpsertSPVForm defaultValues={spvData} selectValues={selectValues} companyValue={companyList} />}</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
