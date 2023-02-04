import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import "./UserPage.css";

const UserPage = () => {
  const navigate = useNavigate();

  function submit(e) {
    const form = document.getElementById("form");

    e.preventDefault();

    const formData = new FormData(form);

    e.preventDefault();
    axios
      .post("https://22f3-89-77-236-116.eu.ngrok.io/check", formData)
      .then((res) => {
        console.log(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(...formData);
  }

  return (
    <div className="general_form">
      <form id="form" onSubmit={(e) => submit(e)}>
        <div className="upload_inputs">
          <div className="json_file">
            <label>Json</label>
            <input
              id="json"
              type="file"
              name="json"
              accept="compress/*"
            ></input>
          </div>
          <div className="session_file">
            <label>Session</label>
            <input
              id="session"
              type="file"
              name="session"
              accept="compress/*"
            ></input>
          </div>
        </div>
        <div className="text_inputs">
          <input id="ip" type="text" name="ip"></input>
          <input id="port" type="text" name="port"></input>
          <input id="user" type="text" name="user"></input>
          <input id="pwd" type="text" name="pwd"></input>
        </div>
        <div className="submit_inputs">
          <input type="submit" value="Проверить прокиси (Check proxy)"></input>
        </div>
      </form>
      <button onClick={() => navigate("/SecondPage")}>SecondPage</button>
    </div>
  );
  //   }
};

export default UserPage;

// const UserPage = () => {
//   const navigate = useNavigate();

//   const url = "https://48bb-89-77-236-116.eu.ngrok.io/check";
//   const [data, setData] = useState({
//     json: "",
//     session: "",
//     ip: "",
//     port: "",
//     user: "",
//     pwd: "",
//   });

//   function handle(e) {
//     const newdata = { ...data };
//     newdata[e.target.id] = e.target.value;
//     const formdata = new FormData();

//     // formdata.append("json", formdata);
//     // formdata.append("session", formdata);
//     setData(newdata);
//     // setData(formdata);
//     console.log(newdata);
//   }

//   function submit(e) {
//     e.preventDefault();
//     Axios.post(url, {
//       json: data.json,
//       session: data.session,
//       ip: data.ip,
//       date: data.port,
//       user: data.user,
//       pwd: data.pwd,
//     }).then(
//       (res) => {
//         console.log(res.data);
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log();
//   }

//   return (
//     <div className="general_form">
//       <form onSubmit={(e) => submit(e)}>
//         <div className="upload_inputs">
//           <div className="json_file">
//             <label>Json</label>
//             <input
//               onChange={(e) => handle(e)}
//               id="json"
//               value={data.json}
//               type="file"
//               name="json"
//             ></input>
//           </div>
//           <div className="session_file">
//             <label>Session</label>
//             <input
//               onChange={(e) => handle(e)}
//               id="session"
//               value={data.session}
//               type="file"
//               name="session"
//             ></input>
//           </div>
//         </div>
//         <div className="text_inputs">
//           <input
//             onChange={(e) => handle(e)}
//             id="ip"
//             value={data.ip}
//             type="text"
//             name="ip"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="port"
//             value={data.port}
//             type="text"
//             name="port"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="user"
//             value={data.user}
//             type="text"
//             name="user"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="pwd"
//             value={data.pwd}
//             type="text"
//             name="pwd"
//           ></input>
//         </div>
//         <div className="submit_inputs">
//           <input type="submit" value="Проверить прокиси (Check proxy)"></input>
//         </div>
//       </form>
//       <button onClick={() => navigate("/SecondPage")}>SecondPage</button>
//       {/* <DataFetching /> */}
//     </div>
//   );
//   //   }
// };

// export default UserPage;

// const UserPage = () => {
//   const navigate = useNavigate();

//   const url = "https://48bb-89-77-236-116.eu.ngrok.io/check";
//   const [data, setData] = useState({
//     json: "",
//     session: "",
//     ip: "",
//     port: "",
//     user: "",
//     pwd: "",
//   });

//   function handle(e) {
//     const newdata = { ...data };
//     newdata[e.target.id] = e.target.value;
//     setData(newdata);
//     console.log(newdata);
//   }

//   function submit(e) {
//     e.preventDefault();
//     Axios.post(url, {
//       json: data.json,
//       session: data.session,
//       ip: data.ip,
//       date: data.port,
//       user: data.user,
//       pwd: data.pwd,
//     }).then((res) => {
//       console.log(res.data);
//     });
//   }

//   return (
//     <div className="general_form">
//       <form onSubmit={(e) => submit(e)}>
//         <div className="upload_inputs">
//           <div className="json_file">
//             <label>Json</label>
//             <input
//               onChange={(e) => handle(e)}
//               id="json"
//               value={data.json}
//               type="file"
//               name="json"
//             ></input>
//           </div>
//           <div className="session_file">
//             <label>Session</label>
//             <input
//               onChange={(e) => handle(e)}
//               id="session"
//               value={data.session}
//               type="file"
//               name="session"
//             ></input>
//           </div>
//         </div>
//         <div className="text_inputs">
//           <input
//             onChange={(e) => handle(e)}
//             id="ip"
//             value={data.ip}
//             type="text"
//             name="ip"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="port"
//             value={data.port}
//             type="text"
//             name="port"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="user"
//             value={data.user}
//             type="text"
//             name="user"
//           ></input>
//           <input
//             onChange={(e) => handle(e)}
//             id="pwd"
//             value={data.pwd}
//             type="text"
//             name="pwd"
//           ></input>
//         </div>
//         <div className="submit_inputs">
//           <input type="submit" value="Проверить прокиси (Check proxy)"></input>
//         </div>
//       </form>
//       <button onClick={() => navigate("/SecondPage")}>SecondPage</button>
//       {/* <DataFetching /> */}
//     </div>
//   );
//   //   }
// };

// export default UserPage;

// class UserPage extends Component {
//   // const navigate = useNavigate();
//   state = {
//     navigate: "",
//     json: null,
//     session: null,
//     ip: "",
//     port: "",
//     user: "",
//     pwd: "",
//   };

//   handleFile(e) {
//     let file = e.target.files;
//     console.log(file);

//     const formdata = new FormData();

//     formdata.append("json", file);
//     formdata.append("session", file);
//     formdata.append("ip", file);
//     formdata.append("port", file);
//     formdata.append("user", file);
//     formdata.append("pwd", file);
//     console.log(formdata);
//     // formdata.append("name", "Zaka Hasanzade");
//   }

//   sendFiles(e) {
//     e.preventDefault();

//     axios({
//       url: "https://48bb-89-77-236-116.eu.ngrok.io/check",
//       method: "POST",
//       henders: {
//         autorization: "your token",
//       },
//       data: this.formdata,
//     }).then(
//       (res) => {},
//       (err) => {}
//     );
//   }

//   //  stat
//   render() {
//     return (
//       <div className="general_form">
//         <form onSubmit={(e) => this.sendFiles(e)}>
//           <div className="upload_inputs">
//             <div className="json_file">
//               <label>Json</label>
//               <input
//                 type="file"
//                 name="json"
//                 onChange={(e) => this.handleFile(e)}
//               ></input>
//             </div>
//             <div className="session_file">
//               <label>Session</label>
//               <input
//                 type="file"
//                 name="session"
//                 onChange={(e) => this.handleFile(e)}
//               ></input>
//             </div>
//           </div>
//           <div className="text_inputs">
//             <input
//               type="text"
//               name="ip"
//               onChange={(e) => this.handleFile(e)}
//             ></input>
//             <input
//               type="text"
//               name="port"
//               onChange={(e) => this.handleFile(e)}
//             ></input>
//             <input
//               type="text"
//               name="user"
//               onChange={(e) => this.handleFile(e)}
//             ></input>
//             <input
//               type="text"
//               name="pwd"
//               onChange={(e) => this.handleFile(e)}
//             ></input>
//           </div>
//           <div className="submit_inputs">
//             <input
//               type="submit"
//               value="Проверить прокиси (Check proxy)"
//             ></input>
//           </div>
//         </form>
//         <button onClick={() => this.state.navigate("/SecondPage")}>
//           SecondPage
//         </button>
//         {/* <DataFetching /> */}
//       </div>
//     );
//   }
// }

// export default UserPage;

// const UserPage = () => {
//   const navigate = useNavigate();
//   const [name, setname] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const submitForm = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("file", selectedFile);

//     axios
//       .post("https://48bb-89-77-236-116.eu.ngrok.io/check", formData)
//       .then((res) => {
//         alert("File Upload success");
//       })
//       .catch((err) => alert("File Upload Error"));
//   };

//   return (
//     <div className="general_form">
//       <form>
//         <div className="upload_inputs">
//           <div className="json_file">
//             <label>Json</label>
//             <FileUploaded
//           onFileSelectSuccess={(file) => setSelectedFile(file)}
//           onFileSelectError={({ error }) => alert(error)}
//         />
//           </div>
//           <div className="session_file">
//             <label>Session</label>
//             <input type="file" name="session"></input>
//           </div>
//         </div>
//         <div className="text_inputs">
//           <input
//             type="text"
//             name="ip"
//             value={{ name }}
//             onChange={(e) => setname(e.target.value)}
//           ></input>
//           <input type="text" name="port"></input>
//           <input type="text" name="user"></input>
//           <input type="text" name="pwd"></input>
//         </div>
//         <div className="submit_inputs">
//           <input type="submit" value="Проверить прокиси (Check proxy)"></input>
//         </div>
//       </form>
//       <button onClick={submitForm}>SecondPage</button>
//       {/* <DataFetching /> */}
//     </div>
//   );
// };

// export default UserPage;
