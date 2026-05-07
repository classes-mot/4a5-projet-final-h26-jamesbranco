import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

import AuthContext from "./components/AuthContext/AuthContext";

import RootLayout from "./Pages/RootLayout";
import Error from "./Pages/Error";

import HomePage from "./Pages/HomePage";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AddSong from "./Pages/AddSong";
import EditSong from "./Pages/EditSong";

import Review from "./Pages/Review";
import MyReviews from "./Pages/MyReviews";
import AddReview from "./Pages/AddReview";
import EditReview from "./Pages/EditReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // HOME PAGE
      { index: true, element: <HomePage /> },

      //  AUTH
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      //  SONGS
      { path: "songs/add", element: <AddSong /> },
      { path: "songs/edit/:id", element: <EditSong /> },

      //  SONG DETAILS + REVIEWS
      { path: "songs/:id", element: <Review /> },

      //  REVIEWS
      { path: "my-reviews", element: <MyReviews /> },
      { path: "reviews/add/:songId", element: <AddReview /> },
      { path: "reviews/edit/:id", element: <EditReview /> },
    ],
  },
]);

function App() {
  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
