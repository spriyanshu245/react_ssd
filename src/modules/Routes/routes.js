import { lazy } from "react";

const routes = [
  { path: "*", component: lazy(() => import("../App/Page404")) },
  { path: "/login", component: lazy(() => import("../User/Login")), guest: true },
  { path: "/changePassword", component: lazy(() => import("../User/ChangePassword")), account: true },
  { path: "/spv/add", component: lazy(() => import("../SPV/SPVList/UpsertSPV")), account: true },
  { path: "/spv/edit/:spvId", component: lazy(() => import("../SPV/SPVList/UpsertSPV")), account: true },
  { path: "/", component: lazy(() => import("../Dashboard/Dashboard")), account: true },
  { path: "/spv/list", component: lazy(() => import("../SPV/SPVList/SPVList")), account: true },
  { path: "/spv/investors", component: lazy(() => import("../SPV/Investors/Investors")), account: true },
  { path: "/spv/invitedInvestors", component: lazy(() => import("../SPV/InviteInvestors/InviteInvestors")), account: true },
];

export default routes;