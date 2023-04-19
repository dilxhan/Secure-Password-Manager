import { passwordsCollection } from "@/firebase/firestore/references";
import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";

const NewPwd = ({ refresh, onClose }) => {
  const [website, setWebsite] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const AuthUser = useAuthUser();

  const passwordGen = () => {


    let pass = "";
    for (let l = 0; l < 13; l++) {
      const rand = Math.random() * (126 - 33) + 33;
      pass += String.fromCharCode(~~rand);
    }


    console.log(pass)
    setPassword(pass)
  }

  const save = async () => {


    await passwordsCollection.add({
      website,
      password,
      email,
      uid: AuthUser.id

    })

    setEmail("")
    setPassword("")
    setWebsite("")
    refresh()
  }



  return (
    <div className="w-full h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">

      <div className="">

        <div className="border border-opacity-10 w-96 py-6 px-4 rounded-md bg-black flex flex-col gap-3">
          <div className="w-full flex justify-end text-white p-2" onClick={onClose}>X</div>

          <label>
            Website
            <input
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              className="px-1 py-2 w-full rounded-md border-navy outline-solid bg-white bg-opacity-30"
              style={{ outline: "#303030 solid" }} />
          </label>

          <label>
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-1 py-2 w-full rounded-md border-navy outline-solid bg-white bg-opacity-30"
              style={{ outline: "#303030 solid" }} />
          </label>

          <label>
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-1 py-2 w-full rounded-md border-navy outline-solid bg-white bg-opacity-30"
              style={{ outline: "#303030 solid" }} />
          </label>

          <div className="mb-4 text-xs text-blue cursor-pointer select-none" onClick={passwordGen}>Generate Password</div>

          <button
            onClick={save}
            className="bg-blue rounded shadow-md p-2 text-white text-lg font-extrabold"

          >
            Save password
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPwd;
