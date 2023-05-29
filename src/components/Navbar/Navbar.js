/* ----- Navbar.scss ----- */
import React, { useState, useEffect } from "react";
import "./Navbar.scss";

// Assests
import GramaCheckLogoV1 from "../../assets/images/logo/GramaSevakaLogo-01.png";
import GramaCheckLogoV2 from "../../assets/images/logo/GramaSevakaLogo-02.png";

// Components

// Libraries & Packages
import { useAuthContext } from "@asgardeo/auth-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Color from "color";
import { Link } from "react-router-dom";

// Util
import { Colors } from "../../utils/styles/Theme";

// Icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar() {
  // Asgardeo Auth Context
  const { state, signOut, getBasicUserInfo } = useAuthContext();

  //State
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [display, setDisplay] = useState();
  const [isGS, setIsGS] = useState(false);

  // useEffect
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect
  useEffect(() => {
    const getBasicUserDetails = () => {
      if (state.isAuthenticated) {
        getBasicUserInfo()
          .then((basicUserDetails) => {
            const userData = {
              firstName: basicUserDetails.givenName,
              lastName: basicUserDetails.familyName,
              email: basicUserDetails.username,
              group: basicUserDetails.groups,
            };
            setUser(userData);
            if (userData.group !== undefined) {
              if (userData.group[0] === "GramaSevaka") {
                setIsGS(true);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getBasicUserDetails();
  }, [state.isAuthenticated, getBasicUserInfo]);

  return (
    <div className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/dashboard">
            <img
              src={windowSize[0] < 700 ? GramaCheckLogoV1 : GramaCheckLogoV2}
              alt=""
            />
          </Link>
        </div>
        {/* Username */}
        <div className="navbar__username">
          {!user ? (
            <Skeleton
              count={1}
              width={150}
              height={20}
              baseColor={Color(Colors.primary_regular).alpha(0.2)}
              highlightColor={Color(Colors.primary_regular).alpha(0.2)}
            />
          ) : (
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
          )}
        </div>
        {/* UserImage */}
        <div className="navbar__userimage">
          {!user ? (
            <Skeleton
              borderRadius={"50%"}
              count={1}
              width={40}
              height={40}
              baseColor={Color(Colors.primary_regular).alpha(0.2)}
              highlightColor={Color(Colors.primary_regular).alpha(0.2)}
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?background=${Colors.primary_regular.replace(
                "#",
                ""
              )}&color=${Colors.white.replace("#", "")}&name=${
                user.firstName
              }+${user.lastName}`}
              alt=""
              onClick={() => setDisplay(!display)}
            />
          )}
          {/* Menu */}
          <div
            className="navbar__menu"
            style={display ? { display: "flex" } : { display: "none" }}
          >
            {/* Signout */}
            <div
              className="navbar__menu__item__signout"
              onClick={() => {
                localStorage.removeItem("user");
                signOut();
              }}
            >
              <ExitToAppIcon />
              <p>Signout</p>
            </div>
            {/* Help */}
            {!isGS && (
              <Link
                to="/help"
                className="navbar__menu__item__help"
                style={{ textDecoration: "none" }}
              >
                <div className="navbar__menu__item__help__container">
                  <HelpOutlineIcon />
                  <p>Help</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
