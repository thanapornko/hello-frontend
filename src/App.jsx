import "normalize.css";
import { ToastContainer } from "react-toastify";
import Router from "./routes/Router";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        theme="light"
      />
    </>
  );
}
