import React from "react";
import Main from "@/page/Main";
import Domains from "@/page/Domains";
import DNS from "@/page/DNS";
import NavBar from "@/components/NavBar";
import Settings from "@/page/Settings";
import Resolve from "@/page/Resolve";

function Page({ params }: { params: { id: string } }) {
  const pageComponents: { [key: string]: JSX.Element | string } = {
    dashboard: <Main />,
    dns: <DNS />,
    domains: <Domains />,
    resolve: <Resolve />,
    settings: <Settings />,
  };

  const renderPage = () =>
    pageComponents[params.id] || <div>Page not found</div>;
  const showNavBar = !!pageComponents[params.id];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {showNavBar && <NavBar />}
      <div className={showNavBar ? "ml-72 w-full pl-20 pr-32 pt-20" : "w-full"}>
        {renderPage()}
      </div>
    </div>
  );
}

export default Page;
