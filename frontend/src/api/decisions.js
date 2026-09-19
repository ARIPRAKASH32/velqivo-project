import axios from "axios";

// Change this to your EC2 public IP once deployed, e.g.:
// const BASE_URL = "http://<EC2_PUBLIC_IP>:8080/api/decisions";
const BASE_URL = "http://localhost:8080/api/decisions";

export const getAllDecisions = () => axios.get(BASE_URL);

export const getDecisionById = (id) => axios.get(`${BASE_URL}/${id}`);

export const searchDecisions = (query) =>
  axios.get(`${BASE_URL}/search`, { params: { q: query } });

export const createDecision = (decision) => axios.post(BASE_URL, decision);

export const updateStatus = (id, status) =>
  axios.patch(`${BASE_URL}/${id}/status`, { status });

export const deleteDecision = (id) => axios.delete(`${BASE_URL}/${id}`);
