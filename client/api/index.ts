import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:3300";

export default axios.create({ baseURL: BASE_URL + "/api" });
