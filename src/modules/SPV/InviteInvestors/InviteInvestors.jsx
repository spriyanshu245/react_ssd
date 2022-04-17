import { useState } from "react";
import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table, UncontrolledDropdown } from "reactstrap";
import { useAuth } from "../../App/AuthProvider";
import Loader from "../../Common/components/Loader";
import useAsync from "../../Common/hooks/useAsync";
import SearchForm from "./inviterInvestorSearchForm";

export default function InviteInvestor() {
  let auth = useAuth();

  const [showFilter, setShowFilter] = useState(false);
  let [defaultValues, setDefaultValues] = useState();
  let [invitedInvestorList, setInvitedInvestorList] = useState([]);

  const [isLoading] = useAsync(getData, true);
  let [SpvList, setSpvList] = useState({});

  async function getData() {
    let data = await auth.api.get("Spv/GetSpvListForDropdown", { params: { groupId: auth.user.groupId, roleName: auth.user.role, userEmail: auth.user.email } });
    setSpvList(data);
    getInvitedInvestor({ spvId: data[0].value });
  }

  async function getInvitedInvestor(values) {
    setDefaultValues(values);
    let data = await auth.api.get("Spv/GetInvitedInvestorDetails", { params: values });
    setInvitedInvestorList(data);
  }

  async function onSubmitFn(data) {
    getInvitedInvestor(data);
    toggleFilter();
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Invite Investors</h4>
            <div className="d-flex align-items-center justify-content-between">
              <Button color="primary" className="btn-sm mx-5">
                <i className="mdi mdi-plus-circle font-size-16 align-middle me-1" /> Invite New
              </Button>

              <Button color="primary" onClick={toggleFilter}>
                Filter
              </Button>
            </div>
          </div>
        </Col>
        <Offcanvas isOpen={showFilter} direction="end" scrollable toggle={toggleFilter}>
          <OffcanvasHeader toggle={toggleFilter}>Filter</OffcanvasHeader>
          <OffcanvasBody>
            <SearchForm optionGroup={SpvList} defaultValues={defaultValues} onSubmitFn={onSubmitFn} />
          </OffcanvasBody>
        </Offcanvas>
      </Row>
      <Row>
        <Col>{isLoading ? <Loader /> : <InvitedInvestorTable />}</Col>
      </Row>
    </Container>
  );

  function InvitedInvestorTable() {
    return (
      <div className="">
        <div className="table-responsive">
          <Table className="bg-white align-middle table-hover">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <div className="form-check font-size-16">
                    <input type="checkbox" className="form-check-input" id="allInvestor" />
                    <label className="form-check-label" htmlFor="allInvestor" />
                  </div>
                </th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Invitation Sent On</th>
                <th scope="col">Invitation Status</th>
                <th scope="col">Date Joined</th>
                <th scope="col">Commitment ($)</th>
                <th scope="col">Expenses</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {invitedInvestorList && invitedInvestorList.length ? (
                invitedInvestorList.map((investor, index) => (
                  <tr key={index}>
                    <td style={{ width: "40px" }}>
                      <div className="form-check font-size-16">
                        <input type="checkbox" className="form-check-input" id={investor.id} />
                        <label className="form-check-label" htmlFor={investor.id} />
                      </div>
                    </td>
                    <td>{investor.firstName}</td>
                    <td>{investor.lastName}</td>
                    <td>{investor.email}</td>
                    <td>{investor.phone}</td>
                    <td>{investor.invitationSentOn}</td>
                    <td>{investor.invitationStatus}</td>
                    <td>{investor.dateJoined}</td>
                    <td>{investor.commitmentAmountInString}</td>
                    <td>{investor.expensesInString}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle href="#" className="card-drop" tag="i">
                          <i className="mdi mdi-dots-vertical font-size-18" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem href="#" onClick={() => editInviteInvestor(investor)}>
                            <i className="mdi mdi-pencil font-size-16 text-success me-1" /> Edit
                          </DropdownItem>
                          <DropdownItem href="#" onClick={() => deleteInvestor(investor)}>
                            <i className="mdi mdi-trash-can font-size-16 text-danger me-1" /> Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">
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

  function editInviteInvestor(investor) {
    console.log(investor);
  }

  function deleteInvestor(investor) {
    console.log(investor);
  }
}
