const Card = ({ email, password, website }) => {
  console.log("ucc", email, password, website)

  return (
    <div className="w-72 h-32 bg-navy text-white rounded-md p-3 flex flex-col">
      <div className="text-2xl">
        {website}
      </div>

      <div className="opacity-75 mt-auto">
        <div >
          Email: {email}
        </div>

        <div className="relative">
          Password: <span className="p-1 bg-lightGray text-lightGray hover:bg-opacity-0 hover:text-white transition-all
                    duration-300 rounded-md cursor-pointer">{password}</span>
        </div>

      </div>
      {/* {JSON.stringify(passwords)} */}

    </div>
  );
};

export default Card;
