import axios from "axios";

export default process.env.BASE_URL || "http://localhost:3300" + "/api";

// export default axios.create({ baseURL: BASE_URL + "/api" });
