import NavBar from "@/components/NavBar";
import Main from "@/pages/Main";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  const pageComponents: { [key: string]: JSX.Element | string } = {
    dashboard: <Main />,
    register: "Register",
    domains: "Domains",
    integrations: "Integrations",
  };

  const renderPage = () =>
    pageComponents[params.id] || <div>Page not found</div>;
  const showNavBar = !!pageComponents[params.id];

  return (
    <div className="flex">
      {showNavBar && <NavBar />}
      <div className={showNavBar ? "ml-72 w-full pl-10" : "w-full"}>
        {renderPage()}
      </div>
    </div>
  );
}

export default Page;
