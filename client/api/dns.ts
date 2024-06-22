import api from ".";

export const getDomains = async () => api.get("/dns/domains");
