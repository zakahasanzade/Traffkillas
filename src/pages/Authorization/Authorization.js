import React from "react";
import "./Authorization.css";
import MainLogo from "./../../assets/MainLogo.svg";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

/* A function declaration. */
const Authorization = () => {
  const navigate = useNavigate();

  const createNotification = (type) => {
    if (type === "info") {
      NotificationManager.info(
        <div style={{ textAlign: "center" }}>
          Забыл пароль?
          <br />
          <small style={{ fontSize: "18px", fontWeight: "700" }}>
            Спроси любого тимлида
          </small>
        </div>
      );
    } else if (type === "error") {
      NotificationManager.error(
        <div
          style={{ fontSize: "18px", fontWeight: "700", textAlign: "center" }}
        >
          Неправильный логин или пароль
        </div>,
        <div style={{ textAlign: "center" }}>Обойдешься!</div>,
        5000,
        () => {
          alert("callback");
        }
      );
    }
  };

  //   const ChangePage = (e) => {
  //     e.preventDefault();
  //     const btn = document.querySelector(".arrow");
  //     btn.onclick = () => {
  //       navigate("/MainPage");
  //     };
  //   };
  //   document.addEventListener("DOMContentLoaded", ChangePage);

  function submit(e) {
    e.preventDefault();

    // const formData = new FormData(form);
    // const data = new FormData(e.target);

    // const value = Object.fromEntries(data.entries());

    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    const headers = {
      "Content-type": "application/json",
    };
    fetch("https://api1.traffkillas.kz/login", {
      method: "POST",
      headers: headers,
      withCredentials: true,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status != 200) {
          throw new Error("Wrong user or password");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", JSON.parse(result).token);
        // document.cookie = "token=" + localStorage.getItem("token");
        localStorage.setItem("position", JSON.parse(result).position);
        navigate("/MainPage");
      })
      .catch((err) => {
        createNotification("error");
      });
  }

  return (
    <div className="page_autorization">
      <main className="page_autorization_main">
        <div className="page_autorization_logo">
          <img src={MainLogo} alt="MainLogo" />
        </div>
        <form
          className="page_autorization_inputs form"
          id="form"
          onSubmit={(e) => submit(e)}
        >
          <input
            placeholder="логин"
            type="text"
            name="username"
            className="username"
          ></input>
          <input
            placeholder="пароль"
            type="password"
            name="password"
            className="password"
          ></input>
          {/* <div type="submit"> */}
          <button type="submit" className="arrow" />
          {/* </div> */}
        </form>

        <div className="page_autorization_footer">
          <p
            onClick={() => {
              createNotification("info");
            }}
          >
            Забыли пароль?
          </p>
        </div>
      </main>
      <NotificationContainer />
    </div>
  );
};

export default Authorization;

// class Authorization extends Component {

//   state = {
//     ROLES: [
//         {
//           'User': 2001,
//           'Editor': 1984,
//           'Admin': 5150

//         }
//     ]
// }

//   render() {
//     return (
//       <div className="main-page">
//         <Header />
//         <main className="main-page__content">
//           <section className="main-page__main-section">
//             <div className="main-page__Authorization">
//               <Routes>
//                 <Route path="/" element={<Layout />}>
//                   {/* public routes */}
//                   <Route path="login" element={<Login />} />
//                   <Route path="register" element={<Register />} />
//                   <Route path="linkpage" element={<LinkPage />} />
//                   <Route path="unauthorized" element={<Unauthorized />} />

//                   {/* we want to protect these routes */}
//                   <Route element={<RequireAuth allowedRoles={[this.state.ROLES.User]} />}>
//                     <Route path="/" element={<Home />} />
//                   </Route>

//                   <Route
//                     element={<RequireAuth allowedRoles={[this.state.ROLES.Editor]} />}
//                   >
//                     <Route path="editor" element={<Editor />} />
//                   </Route>

//                   <Route element={<RequireAuth allowedRoles={[this.state.ROLES.Admin]} />}>
//                     <Route path="admin" element={<Admin />} />
//                   </Route>

//                   <Route
//                     element={
//                       <RequireAuth allowedRoles={[this.state.ROLES.Editor, this.state.ROLES.Admin]} />
//                     }
//                   >
//                     <Route path="lounge" element={<Lounge />} />
//                   </Route>

//                   {/* catch all */}
//                   <Route path="*" element={<Missing />} />
//                 </Route>
//               </Routes>
//             </div>
//           </section>
//         </main>
//       </div>
//     );
//   }
// }

// export default Authorization;
