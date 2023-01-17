import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import MainLogo from "../../../../assets/MainLogo.svg";
import LightMode from "../../../../assets/LightMode.svg";
import ProfilePhoto from "../../../../assets/ProfilePhoto.svg";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const navigate = useNavigate();

  const ChangeMode = () => {
    alert("Mode changes will be active very soon");
  };

  const ViewProfile = () => {
    navigate("/MainPage/Profile");
  };

  const [show, setShow] = useState(false);

  return (
    <div className="header">
      <div className="header_logo">
        <img src={MainLogo} alt="MainLogo" />
      </div>
      <div className="header_profile">
        <button onClick={ChangeMode} id="mode_button">
          <img src={LightMode} alt="LightMode" />
        </button>
        <button id="profile_button">
          <p onClick={() => setShow(!show)}>
            {show ? "Абабус_2002" : "Абабус_2002"}
          </p>
          <img src={ProfilePhoto} alt="ProfilePhoto" onClick={ViewProfile} />
        </button>

        <CSSTransition in={show} classNames="alert" timeout={1000} unmountOnExit>
          <ul className="profile_button_info" id="time">
            <li className="profile_button_info_li">
              <p className="red">₸ 1 200 000</p>
            </li>
            <li className="profile_button_info_li">
              <p>600MMR</p>
            </li>
            <li className="profile_button_info_li">
              <p className="orange">54TTK</p>
            </li>
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Header;

// const Header = () => {
//   const navigate = useNavigate();

//   const ChangeMode = () => {
//     alert("Mode changes will be active very soon");
//   };

//   const ViewProfile = () => {
//     navigate("/MainPage/Profile");
//   };

//   const ViewInfo = () => {
//     setIsMenuOpen((oldState) => !oldState);
//   };
//   const ref = useRef();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   useEffect(() => {
//     const checkIfClickedOutside = (e) => {
//       // If the menu is open and the clicked target is not within the menu,
//       // then close the menu
//       if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", checkIfClickedOutside);
//     return () => {
//       // Cleanup the event listener
//       document.removeEventListener("mousedown", checkIfClickedOutside);
//     };
//   }, [isMenuOpen]);

//   return (
//     <div className="header">
//       <div className="header_logo">
//         <img src={MainLogo} alt="MainLogo" />
//       </div>
//       <div className="header_profile">
//         <button onClick={ChangeMode} id="mode_button">
//           <img src={LightMode} alt="LightMode" />
//         </button>
//         <button id="profile_button">
//           <p onClick={ViewInfo}>Абабус_2002</p>
//           <img src={ProfilePhoto} alt="ProfilePhoto" onClick={ViewProfile} />
//         </button>
//         {isMenuOpen && (
//           <ul className="profile_button_info">
//             <li className="profile_button_info_li">
//               <p className="red">₸ 1 200 000</p>
//             </li>
//             <li className="profile_button_info_li">
//               <p>600MMR</p>
//             </li>
//             <li className="profile_button_info_li">
//               <p className="orange">54TTK</p>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
