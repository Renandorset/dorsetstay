import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Pages start from here
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import MainStarter from "./Pages/MainStarter.jsx";
import CreatePropertyListing from "./Pages/CreatePropertyListing.jsx";

import AboutUs from "./Pages/AboutUs.jsx";
import UpdateAboutUs from "./Pages/UpdateAboutUs.jsx";
import ShowProperties from "./Pages/ShowProperties.jsx";

import PropertyDetails from "./Pages/PropertyDetails.jsx";
import BookedProperties from "./Pages/BookedProperties.jsx";
import RentalRequest from "./Pages/RentalRequest.jsx";
import CompleteRent from "./Pages/CompleteRent.jsx";
import CompleteBooking from "./Pages/CompleteBooking.jsx";
// This is  layout sections
import Layout1 from "./Layout/Layout1.jsx";
import Layout2 from "./Layout/Layout2.jsx";

// react redux
import { Provider } from "react-redux";
import store from "./Redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
// Stripe work
import HomePage from "./components1/Homepage.jsx";
import PaymentPage from "./components1/PaymentPage.jsx";
import SuccessPage from "./components1/SuccessPage.jsx";
import FailurePage from "./components1/FailurePage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/main" element={<Layout1 />}>
        <Route path="" element={<MainStarter />} />

        <Route path="property" element={<PropertyDetails />} />
        <Route path="booked" element={<BookedProperties />} />
        <Route path="complete" element={<CompleteBooking />} />
      </Route>
      <Route path="/service" element={<Layout2 />}>
        <Route path="" element={<ShowProperties />} />
        <Route path="create" element={<CreatePropertyListing />} />

        <Route path="about" element={<AboutUs />} />
        <Route path="updateabout" element={<UpdateAboutUs />} />
        <Route path="show" element={<ShowProperties />} />
        <Route path="request" element={<RentalRequest />} />
        <Route path="complete" element={<CompleteRent />} />
      </Route>
      <Route path="/stripe" element={<HomePage />} />
      <Route path="/stripe/payment" element={<PaymentPage />} />
      <Route path="/stripe/success" element={<SuccessPage />} />
      <Route path="/stripe/failure" element={<FailurePage />} />
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
