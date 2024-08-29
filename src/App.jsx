// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { useContext, lazy, Suspense, useEffect, useState } from "react";
// import { DataContext, FunctionsContext } from "./components/Context";

// import "./App.css";
// import NavBar from "./components/Navbar/NavBar";
// import Profile from "./pages/Profile/Profile";
// import ImageInput from "./components/ImageInput/ImageInput";
// import axios from "axios";
// //pages
// // import Home from './pages/Home/Home';
// // import Buy from './pages/Buy/Buy';
// // import Rent from './pages/Rent/Rent';
// // import User from "./pages/User/User";
// // import NotFound from './pages/NotFound';

// const Home = lazy(() => import("./pages/Home/Home"));
// const Buy = lazy(() => import("./pages/Buy/Buy"));
// const Rent = lazy(() => import("./pages/Rent/Rent"));
// const User = lazy(() => import("./pages/User/User"));
// const NotFound = lazy(() => import("./pages/NotFound"));

// function App() {
//   const [userData, setUserData] = useState(null);
//   const [noPhone, setNoPhone] = useState(false);
//   const auth = useContext(DataContext).loginState;
//   const tokenChanger = useContext(FunctionsContext).changeToken;
//   const [searchFilter, setSearchFilter] = useState(null);
//   // const navigate = useNavigate(); // Declare useNavigate hook

//   console.log(auth);

//   const url = new URL(window.location.href);
//   const tok = url.searchParams.get("token");

//   if (tok) {
//     useEffect(() => {
//       // console.log("token: ", tok);
//       // tokenChanger(tok, true);

//       axios({
//         headers: {
//           Authorization: `Bearer ${tok}`,
//         },
//         method: "get",
//         baseURL: "https://app.having.market/api/",
//         url: "user",
//       })
//         .then((response) => {
//           console.log(response.data);
//           if (response.data.phone) {
//             setUserData(response.data);
//           } else {
//             setNoPhone(response.data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching profile data:", error);
//         });
//       console.log(tok);
//     }, [tok]);
//   }
//   // const navigate = useNavigate();
//   function handleSearch(e) {
//     // console.log(e);
//     setSearchFilter(e);
//     // navigate("/buy");
//   }

//   return (
//     <BrowserRouter>
//       <NavBar />
//       <Suspense fallback={<h1>Loading..</h1>}>
//         {() => {
//           if (noPhone) {
//             console.log("no phone: ", noPhone);

//             return (
//               <Routes>
//                 <Route path="/" element={<Profile data={noPhone} />} />
//               </Routes>
//             );
//           } else {
//             console.log("no phone: ", noPhone);
//             return (
//               <Routes>
//                 <Route
//                   path="/"
//                   element={<Home onSearch={handleSearch} />}
//                 ></Route>
//                 {/* <Route path="/rent" element={<Rent searchFilter={searchFilter} />} /> */}
//                 <Route
//                   path="/rent"
//                   element={<Buy searchFilter={searchFilter} action={"rent"} />}
//                 />
//                 <Route
//                   path="/buy"
//                   element={<Buy searchFilter={searchFilter} action={"sell"} />}
//                 />
//                 <Route
//                   path="/profile"
//                   element={
//                     auth.login ? (
//                       <Profile token={auth.token} />
//                     ) : (
//                       <Home onSearch={handleSearch} notAuth={true} />
//                     )
//                   }
//                 />

//                 <Route path="*" element={<NotFound />} />

//                 <Route path="/input" element={<ImageInput />} />
//               </Routes>
//             );
//           }
//         }}
//       </Suspense>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useContext, lazy, Suspense, useEffect, useState } from "react";
import { DataContext, FunctionsContext } from "./components/Context";

import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./pages/Profile/Profile";
import ImageInput from "./components/ImageInput/ImageInput";
import axios from "axios";
import i18n from "./i18n";
import TokenSender from "./pages/TokenSender/TokenSender";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));
const Buy = lazy(() => import("./pages/Buy/Buy"));
const Rent = lazy(() => import("./pages/Rent/Rent"));
const User = lazy(() => import("./pages/User/User"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const [userData, setUserData] = useState(null);
  const [noPhone, setNoPhone] = useState(false);
  const auth = useContext(DataContext).loginState;
  const tokenChanger = useContext(FunctionsContext).changeToken;
  const [searchFilter, setSearchFilter] = useState(null);

  console.log(auth);

  const url = new URL(window.location.href);
  const tok = url.searchParams.get("token");

  useEffect(() => {
    if (tok) {
      axios({
        headers: {
          Authorization: `Bearer ${tok}`,
        },
        method: "get",
        baseURL: "https://app.having.market/api/",
        url: "user",
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.phone) {
            setUserData(response.data);
          } else {
            setNoPhone({ ...response.data, token: tok });
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [tok]);

  function handleSearch(e) {
    setSearchFilter(e);
    // navigate("/buy");
  }

  function handleChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    setLang(lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <BrowserRouter>
      <NavBar onLangChange={handleChangeLanguage} />
      <Suspense fallback={<h1>Loading..</h1>}>
        <Routes>
          <Route path="/token" element={<TokenSender/>} />
          {noPhone ? (
            <>
              <Route
                path="/"
                element={<Profile data={noPhone} token={noPhone.token} />}
              />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home onSearch={handleSearch} />} />
              <Route
                path="/rent"
                element={<Buy searchFilter={searchFilter} action={"rent"} />}
              />
              <Route
                path="/user"
                element={
                  auth.login ? (
                    // auth.phone ? (
                    // true ? (
                    <User />
                  ) : (
                    // ) : (<Profile token={auth.token} phoneState={false} />)
                    <Home onSearch={handleSearch} notAuth={true} />
                  )
                }
              />
              <Route
                path="/buy"
                element={<Buy searchFilter={searchFilter} action={"sell"} />}
              />
              <Route
                path="/profile"
                element={
                  auth.login ? (
                    <Profile token={auth.token} />
                  ) : (
                    <Home onSearch={handleSearch} notAuth={true} />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/input" element={<ImageInput />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route
  path="/user"
  element={
    auth.login ? (
      // auth.phone ? (
      true ? (
        <User />
      ) : (
        <Profile token={auth.token} phoneState={false} />
      )
    ) : (
      <Home onSearch={handleSearch} notAuth={true} />
    )
  }
/> */
}
