import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

import AuthContext from "./components/AuthContext/AuthContext";

import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";

import HomePage from "./pages/HomePage";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";

import Review from "./pages/Review";
import MyReviews from "./pages/MyReviews";
import AddReview from "./pages/AddReview";
import EditReview from "./pages/EditReview";

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
