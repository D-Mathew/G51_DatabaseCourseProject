import React from 'react'
// import ReactDOM from 'react-dom' // deprecated 
import { createRoot } from 'react-dom/client'
import App from "./App"

const container = document.getElementById("root");
const root = createRoot(container)
root.render(<App/>)