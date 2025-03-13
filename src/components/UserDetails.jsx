import React from "react";

const UserDetails = (user ) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {user.imageurl ? (
            <img src={user.imageurl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
              {user.name}
            </div>
          )}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.role}</p>
      </div>
      <div className="mt-6 space-y-4 text-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-medium">📧</span>
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center justify-center space-x-2">
            <span className="font-medium">📞</span>
            <span>{user.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
