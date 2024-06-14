import React, { useEffect, useState } from "react";
import avatar from './../../assets/user.png'
import { signInWithGooglePopup } from './../../firebase.util';
export default function Header () {
  const [user, setUser] = useState ("")
  
  function checkAuthenticationStatus() {
    if (localStorage.getItem("user")) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData.displayName) {
        setIsAuth(true);
        setUser(userData);
      }
    }
  }const [isAuth, setIsAuth] = useState(false)
  
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);
  const logGoogleUser = async () => {
    try {
      const response = await signInWithGooglePopup();
      checkAuthenticationStatus();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <div className="w-full h-[200px]">
        
        {!isAuth? 
          <div className="w-full justify-end flex pt-[73px] px-[72px]">
            <button 
              onClick={logGoogleUser}
              className="bg-white rounded-full p-4"  
            >
              Sign In
            </button>
          </div>
          :
          <div className="w-full justify-end flex pt-[73px] px-[72px]">
            <div className="flex space-x-5 items-center">
              <button 
                className="bg-secondBg text-white  text-sm py-[12px] px-10"
              >
                Home
              </button>
              <button 
                className="bg-secondBg text-white  text-sm py-[12px] px-10"
              >
                Jobs
              </button>
              <button className='py-[4px] bg-green text-xl my-6 text-white px-6'>
                  Upload new CVs
                <br></br>
                <span className='text-sm'>
                  (10 tokens)
                </span>
              </button>
              {user.photoURL === "" ? 
                <img 
                  src={avatar}
                  alt=""
                  width={60}
                />
              :
                <img 
                  src={user.photoURL}
                  alt=""
                  width={60}
                />
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}