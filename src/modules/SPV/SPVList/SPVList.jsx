import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table } from "reactstrap";
import { find } from "lodash";
import * as dayjs from "dayjs";

import { useAuth } from "../../App/AuthProvider";
import useAsync from "../../Common/hooks/useAsync";
import Loader from "../../Common/components/Loader";
import SearchSPVForm from "./SearchSPVForm";

export default function ListSPV() {
  const auth = useAuth();
  let [selectValues, setSelectValues] = useState({});
  let [spvList, setSPVList] = useState([]);

  const memoizedLoad = useCallback(load, []);

  const [isLoading] = useAsync(memoizedLoad, true);
  const [showFilter, setShowFilter] = useState(false);

  async function load() {
    return Promise.allSettled([getData(), getAllSPV()]);

    async function getData() {
      let data = await auth.api.get("Spv/PopulateCreateSpvDropdown");
      setSelectValues(data);
    }
  }

  async function getAllSPV() {
    let data;
    if (auth.user.role == "GroupAdmin") {
      data = await auth.api.get("Spv/GetAllSpvForGA", { params: { groupId: auth.user.groupId } });
    } else if (auth.user.role == "Organizer") {
      data = await auth.api.get("Spv/GetAllSpvForOrganiser", { params: { organiserEmail: auth.user.email } });
    }
    setSPVList(data);
  }

  async function onSubmitFn(values) {
    let data;
    if (auth.user.role == "GroupAdmin") {
      values.groupId = auth.user.groupId;
      data = await auth.api.get("Spv/GetAllSpvForGAByFilter", { params: values });
    } else if (auth.user.role == "Organizer") {
      values.organiserEmail = auth.user.email;
      data = await auth.api.get("Spv/GetAllSpvForOrganiserByFilter", { params: values });
    }
    setSPVList(data);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">SPV List</h4>
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/spv/add">
                <Button color="primary" className="btn-sm mx-5">
                  <i className="mdi mdi-plus-circle font-size-16 align-middle me-1" /> Add SPV
                </Button>
              </Link>

              <Button color="primary" onClick={toggleFilter}>
                Filter
              </Button>
            </div>
          </div>
        </Col>
        <Offcanvas isOpen={showFilter} direction="end" scrollable toggle={toggleFilter}>
          <OffcanvasHeader toggle={toggleFilter}>Filter</OffcanvasHeader>
          <OffcanvasBody>
            <SearchSPVForm optionGroup={selectValues} onSubmitFn={onSubmitFn} />
          </OffcanvasBody>
        </Offcanvas>
      </Row>
      <Row>
        <Col>{isLoading ? <Loader /> : <SpvTable />}</Col>
      </Row>
    </Container>
  );

  function SpvTable() {
    return (
      <div className="">
        <div className="table-responsive">
          <Table className="project-list-table table-nowrap align-middle table-hover">
            <thead>
              <tr>
                <th scope="col">SPV Title</th>
                <th scope="col">Company</th>
                <th scope="col">Target Raise</th>
                <th scope="col">Amount Raised</th>
                <th scope="col">Number of Investors</th>
                <th scope="col">Closing Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {spvList && spvList.length ? (
                spvList.map((spv) => (
                  <tr key={spv.id}>
                    <td>{spv.spvTitle}</td>
                    <td>{spv.companyName}</td>
                    <td>{spv.targetRaise}</td>
                    <td>{spv.totalAmountRaised}</td>
                    <td>{spv.numberOfInvestors}</td>
                    <td> {handleValidDate(spv.dealDeadlineDate)} </td>
                    <td>
                      <Badge className={spv.statusId === 1 ? "bg-success" : spv.statusId === 2 ? "bg-warning" : "bg-info"}>{getStatusName(spv.statusId)}</Badge>
                    </td>
                    <td>
                      <Link to={`/spv/edit/${spv.id}`}>
                        <i className="mdi mdi-pencil font-size-16 text-success me-1" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <h4 className="text-center">No results found.</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  function handleValidDate(date) {
    const date1 = dayjs(new Date(date)).format("DD MMM YYYY");
    return date1;
  }

  function getStatusName(key) {
    let temp = find(selectValues.status, { value: key });
    return temp ? temp.label : null;
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }
}
