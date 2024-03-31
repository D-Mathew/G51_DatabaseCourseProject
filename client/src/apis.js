import axios from "axios";

// NODE_ENV = 'development'
// NODE_ENV = 'production'

// if in production then baseurl = /api/...
// if in development then baseurl = "http://localhost:4000/api/..."

const baseURL = process.env.NODE_ENV === "production" 
    ? "api" 
    : "http://localhost:4000/api";

export default axios.create({
    baseURL,
})