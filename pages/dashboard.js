import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Loader from "@/elements/Loader";
import { useEffect, useState } from "react";
import { passwordsCollection } from "@/firebase/firestore/references";
import Card from "@/elements/Card";
import NewPwd from "@/elements/NewPwd";

import aes from "crypto-js/aes"


const dashboard = () => {
  //auth user object
  const AuthUser = useAuthUser();

  //signout user
  const handleLogout = () => AuthUser.signOut();

  const [passwords, setPasswords] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    console.log(aes.encrypt("test", "key").toString());

    let bytes = aes.decrypt("U2FsdGVkX18sliRdMqNzlmTFZnJinUsQbJxaPKd4CXQ=", "key").toString()

    var decryptedData = JSON.parse(bytes.toString())

    console.log(decryptedData)
  }, [])

  const getData = () => {
    passwordsCollection.where("uid", "==", AuthUser.id).get().then(snapshot => {
      const list = []

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      });

      setPasswords(list)
      setModal(false)

    }, (err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [])




  return (
    <div className="container mx-auto my-10 p-5">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-6xl font-extrabold">
          Your Passwords
        </h1>

        <div className="flex flex-col items-end">
          <span className="text-xl font-bold">
            {AuthUser.displayName ? AuthUser.displayName : "Anonymous"}
          </span>

          <span className="opacity-60">
            {AuthUser.email}
          </span>
        </div>
      </div>

      <hr className="my-10 text-gray" />


      <div className="relative overflow-x-auto">

        <button
          className="bg-blue rounded shadow-md p-2 text-white text-lg my-10 font-extrabold"
          onClick={() => setModal(true)}
        >
          Add New
        </button>

        <table className="w-full text-sm text-left text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-white">
            <tr className="opacity-75">
              <th scope="col" className="px-6 py-3">
                Website
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>

            </tr>
          </thead>

          <tbody>
            {passwords.length > 0 && passwords.map((pwd) => {
              return (

                <tr className="bg-black/90 border-b dark:bg-gray-800 dark:border-gray-700" key={pwd.id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {pwd.website}
                  </th>
                  <td className="px-6 py-4">
                    {pwd.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="p-1 bg-lightGray text-lightGray hover:bg-opacity-0 hover:text-white transition-all
                    duration-300 rounded-md cursor-pointer">{pwd.password}</span>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>



      {modal && (
        <NewPwd refresh={getData} onClose={() => setModal(false)} />
      )}

      <article className="text-left">
        <button
          className="bg-blue rounded shadow-md p-2 text-white text-lg my-10 font-extrabold"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </article>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
  authPageURL: "/login",
})(dashboard);
