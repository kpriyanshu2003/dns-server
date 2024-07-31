import DNSRecords from "@/components/DNS/Tabs/DNS-Records";

export const DNSRecordTypeData = ["A", "CNAME", "NS"];

export const TTLData = ["0.5", "1", "12", "24"];

export const DNSTabsData = [
  {
    key: "dns-records",
    title: "DNS Records",
    children: <DNSRecords />,
  },
  // {
  //   key: "forwarding",
  //   title: "Forwarding",
  //   children: <div>Forwarding</div>,
  // },
  // {
  //   key: "nameservers",
  //   title: "Nameservers",
  //   children: <div>Nameservers</div>,
  // },
  // {
  //   key: "subdomains",
  //   title: "Subdomains",
  //   children: <div>Subdomains</div>,
  // },
  // {
  //   key: "security",
  //   title: "Security",
  //   children: <div>Security</div>,
  // },
  // {
  //   key: "advanced",
  //   title: "Advanced",
  //   children: <div>Advanced</div>,
  // },
  // {
  //   key: "hostnames",
  //   title: "Hostnames",
  //   children: <div>Hostnames</div>,
  // },
];
