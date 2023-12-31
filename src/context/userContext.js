import { createContext, useState } from "react";
// import { useContext } from "react";

export const UserContext = createContext({});
// export const UserContextProvider = ({ Chlidren }) => {
//   // const [userInfo, setUserInfo] = useState();
//   return Chlidren;
//   // return <UserContext.Provider value={{}}>{}</UserContext.Provider>;

// };

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  return (
    <>
      {" "}
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>{" "}
    </>
  );
};
