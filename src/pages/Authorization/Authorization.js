import React from "react";
import "./Authorization.css";
import MainLogo from "./../../assets/MainLogo.svg";
import { useNavigate } from "react-router-dom";

/* A function declaration. */
const Authorization = () => {
  const navigate = useNavigate();

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
    var raw = {
      username: username,
      password: password,
    };
    fetch("https://a98c-89-77-236-116.eu.ngrok.io/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(raw),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status != "200") {
          throw new Error("Wrong user or password");
        }

        return response.text();
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", JSON.parse(result).token);
        navigate("/MainPage");
      })
      .catch((err) => {
        alert(err);
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
          {/* <Input size="mini" placeholder="Login..." />
          <br />
          <Input
            size="mini"
            icon="arrow right"
            className="page_autorization_inputs_submit"
            placeholder="Password..."
          /> */}
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
        {/* <div>
          {users.length > 0 && (
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </div> */}
        <div className="page_autorization_footer">
          <a>Забыли пароль?</a>
        </div>
      </main>
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
