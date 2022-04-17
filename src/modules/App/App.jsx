import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Loader from "../Common/components/Loader";
import ErrorBoundary from "../Common/components/ErrorBoundary";
import { Layout } from "../Layout";
import AppRouter from "../Routes/AppRouter";

import "../../assets/scss/theme.scss";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <AppRouter />
            </ErrorBoundary>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
