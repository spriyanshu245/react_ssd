import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Offcanvas, OffcanvasHeader, OffcanvasBody, DropdownToggle, DropdownMenu, DropdownItem, Table, UncontrolledDropdown, UncontrolledTooltip, Badge } from "reactstrap";

import { useAuth } from "../../App/AuthProvider";
import useAsync from "../../Common/hooks/useAsync";
import Loader from "../../Common/components/Loader";
import SearchForm from "./InvestorSearchForm";
import ExpenseModal from "./ExpenseModal";
import WireAmountModal from "./WireModal";

export default function Investors(props) {
  const auth = useAuth();
  // const params = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showWieModal, setShowWireModal] = useState(false);

  let [SpvList, setSpvList] = useState({});
  let [wiredAmountDetails, setWiredAmountDetails] = useState({});

  let [investorList, setInvestorList] = useState([]);
  let [spvInvestor, setSpvInvestor] = useState([]);
  let [defaultValues, setDefaultValues] = useState();
  const [investor, setInvestor] = useState();

  const memoizedLoad = useCallback(() => getData(), []);

  const [isLoading] = useAsync(memoizedLoad, true);

  async function getData() {
    let data = await auth.api.get("Spv/GetSpvListForDropdown", { params: { groupId: auth.user.groupId, roleName: auth.user.role, userEmail: auth.user.email } });
    setSpvList(data);
    getSpvInvestor({ spvId: data[0].value });
  }

  async function getSpvInvestor(values) {
    setDefaultValues(values);
    let data = await auth.api.get("Spv/GetSpvInvestor", { params: values });
    setInvestorList(data.spvInvestorModels);
    setSpvInvestor(data);
  }

  async function onSubmitFn(data) {
    getSpvInvestor(data);
    toggleFilter();
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Investors</h4>
            <Button color="primary" onClick={toggleFilter}>
              Filter
            </Button>
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
        <Col>{isLoading ? <Loader /> : <InvestorTable />}</Col>
      </Row>
      {showExpenseModal && <ExpenseModal showModal={showExpenseModal} toggle={toggleExpense} onAddFn={onExpenseFn} />}
      {showWieModal && <WireAmountModal showModal={showWieModal} toggle={toggleWire} wireDetails={wiredAmountDetails} onAddFn={onWireFn} />}
    </Container>
  );

  function InvestorTable() {
    return (
      <div className="">
        <div className="text-muted text-end">
          <b>{spvInvestor.totalRecords} Investors</b>
        </div>
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
                <th scope="col">Investment Name</th>
                <th scope="col">Investor</th>
                <th scope="col">Committed ($)</th>
                <th scope="col">Expense ($)</th>
                <th scope="col">Wired ($)</th>
                <th scope="col">Wired Date</th>
                <th scope="col">Commitment Date</th>
                <th scope="col">ESign Status</th>
                <th scope="col">Documents</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {investorList && investorList.length ? (
                investorList.map((investor) => (
                  <tr key={investor.id}>
                    <td style={{ width: "40px" }}>
                      {investor.showCheckBox && (
                        <div className="form-check font-size-16">
                          <input type="checkbox" className="form-check-input" id={investor.id} />
                          <label className="form-check-label" htmlFor={investor.id} />
                        </div>
                      )}
                    </td>
                    <td>{investor.investmentName}</td>
                    <td>{investor.investorFullName}</td>
                    <td>{investor.commitmentAmount}</td>
                    <td>{investor.expenseAmount}</td>
                    <td>{investor.wiredAmount}</td>
                    <td>{investor.wiredDate}</td>
                    <td>{investor.commitmentDate}</td>
                    <td>
                      <Badge className={investor.eSignStatus === 1 ? "bg-success" : investor.eSignStatus === 2 ? "bg-warning" : "bg-info"}>{investor.eSignStatus}</Badge>
                    </td>
                    <td>
                      <span id={"operatingAgreement" + investor.id}>{investor.operatingAgreement ? <i className="mdi mdi-check-circle font-size-16 align-middle me-1 text-success" /> : <i className="mdi mdi-close-circle font-size-16 align-middle me-1 text-danger" />}</span>

                      <span id={"subscriptionAgreement" + investor.id}>{investor.subscriptionAgreement ? <i className="mdi mdi-check-circle font-size-16 align-middle me-1 text-success" /> : <i className="mdi mdi-close-circle font-size-16 align-middle me-1 text-danger" />}</span>

                      <span id={"W9Document" + investor.id}>{investor.w9Document ? <i className="mdi mdi-check-circle font-size-16 align-middle me-1 text-success" /> : <i className="mdi mdi-close-circle font-size-16 align-middle me-1 text-danger" />}</span>

                      <UncontrolledTooltip placement="top" target={"operatingAgreement" + investor.id}>
                        Operating Agreement
                      </UncontrolledTooltip>
                      <UncontrolledTooltip placement="top" target={"subscriptionAgreement" + investor.id}>
                        Subscription Agreement
                      </UncontrolledTooltip>

                      <UncontrolledTooltip placement="top" target={"W9Document" + investor.id}>
                        W9 Document
                      </UncontrolledTooltip>
                    </td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle href="#" className="card-drop" tag="i">
                          <i className="mdi mdi-dots-vertical font-size-18" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem href="#" onClick={() => openExpenseModal(investor)}>
                            <i className="mdi mdi-plus-circle font-size-16 text-success me-1" /> Add/Edit Expense
                          </DropdownItem>
                          <DropdownItem href="#" onClick={() => openWireModal(investor)} disabled={auth.user.role == "Organizer"}>
                            <i className="mdi mdi-plus-circle font-size-16 me-1" /> Add Wire
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
            <tfoot>
              <tr>
                <td style={{ width: "40px" }}></td>
                <td></td>
                <td></td>
                <td>
                  <b>{spvInvestor.totalCommitmentAmount}</b>
                </td>
                <td>
                  <b>{spvInvestor.totalExpenseAmount}</b>
                </td>
                <td>
                  <b>{spvInvestor.totalWiredAmount}</b>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    );
  }

  function toggleFilter() {
    setShowFilter(!showFilter);
  }

  function toggleExpense() {
    setShowExpenseModal(!showExpenseModal);
  }

  function openExpenseModal(investor) {
    setInvestor(investor);
    toggleExpense();
  }

  async function onExpenseFn(data) {
    let expense = {
      spvId: investor.spvId,
      expenseAmount: data.expenseAmount,
      investmentId: investor.id,
      expenseAmountinDecimal: parseFloat(data.expenseAmount),
    };
    await auth.api.post("Spv/AddUpdateExpenseAmount", expense);
    getSpvInvestor(defaultValues);
    toggleExpense();
  }

  function toggleWire() {
    setShowWireModal(!showWieModal);
  }

  async function openWireModal(investor) {
    let data = await auth.api.get("Spv/GetWiredAmountDetailsByInvestmentId", { params: { investmentId: investor.id } });
    setWiredAmountDetails(data);
    toggleWire();
  }

  function onWireFn(){
    getSpvInvestor(defaultValues);
    toggleWire();
  }
}
