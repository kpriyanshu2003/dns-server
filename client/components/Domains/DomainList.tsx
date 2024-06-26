import React from "react";
import { getDomains } from "@/actions/domain";
import { v4 as uuid } from "uuid";
import { AllDomainsBackendResponse } from "@/@types/Domain";
import classNames from "classnames";
import { CiGlobe } from "react-icons/ci";
import {
  EntypoCircleWithCross,
  TeenyiconsTickCircleSolid,
} from "@/constants/Icons";
import { DomainModalDeleteDomain } from "./DomainModal";

const DomainsList = async () => {
  try {
    const domains = (await getDomains()).domains;
    return (
      <ul className="bg-white mt-12 border rounded-lg overflow-hidden">
        {domains.map((domain: AllDomainsBackendResponse) => (
          <li
            key={uuid()}
            className={classNames("flex items-center justify-between p-4", {
              "border-b": domain !== domains[domains.length - 1],
            })}
          >
            <div className="flex items-center gap-2">
              <CiGlobe />
              <span>{domain.name}</span>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div
                className={classNames(
                  { "text-green-400": domain.isVerified },
                  { "text-red-400": !domain.isVerified },
                  "flex items-center gap-1"
                )}
              >
                {domain.isVerified ? (
                  <>
                    <TeenyiconsTickCircleSolid />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <EntypoCircleWithCross className="h-4 w-4" />
                    <span>Not Verified</span>
                  </>
                )}
              </div>
              <div className="text-red-400">
                <DomainModalDeleteDomain id={domain._id} name={domain.name} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="mt-12 border rounded-lg p-4 bg-white">
        <span className="font-medium text-red-600">Failed to load domains</span>
      </div>
    );
  }
};

export default DomainsList;
