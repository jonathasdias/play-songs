import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUser";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router";

interface PrivatePageProps {
  Component: JSX.Element;
}

const PrivatePage = ({ Component }: PrivatePageProps) => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();
  const hiddenHeaderRoutes = ["/"];
  const hideHeader = hiddenHeaderRoutes.includes(location.pathname);

  if (isLoading)
    return (
      <div className="grid place-items-center h-96 text-4xl text-white mx-auto mt-2">
        <p>Verificando autenticação.</p>
        <Loading />
      </div>
    );

  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      {!hideHeader && <Header />}
      {Component}
    </>
  );
};

export default PrivatePage;
