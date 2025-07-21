import { useState } from "react";
import { Link } from "react-router";
import { customersData } from "../data";

const Messages = () => {
  const [customers, setCustomers] = useState(customersData);
  
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const handleMarkAsRead = (customerId) => {
    setCustomers(customerList => 
      customerList.map(customer => 
        customer.id === customerId 
          ? { ...customer, isRead: true }
          : customer
      )
    );
  };


  const truncateMessage = (message, maxLength = 80) => {
    return message.length > maxLength 
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  return (
    <div className="messages mb-8 bg-gray-50 py-8">
      {/* container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Messages
          </h1>
        </div>

        {/* table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentUser.isSeller ? "Buyer" : "Seller"}
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Message
                  </th>
                  <th className="px-3 hidden sm:table-cell sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      !customer.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    {/* buyer/seller column */}
                    <td className="px-3 sm:px-6 py-4">
                      <Link 
                        to={`/message/${customer.id}`}
                        className="flex flex-col sm:flex-row sm:text-start text-center items-center cursor-pointer group"
                      >
                        <img
                          className="size-12 sm:size-14 mx-auto  sm:mx-0 rounded-full object-cover mr-3 transition hover:scale-105"
                          src={customer.image}
                          alt={`${customer.name} profile`}
                        />
                        <div>
                          <div className="text-sm font-medium sm:ml-4 text-gray-700 group-hover:text-sky-700 transition-colors">
                            {customer.name}
                          </div>
                          <div className="text-xs text-gray-500 sm:hidden">
                            {customer.date}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* last message column */}
                    <td className="px-3 sm:px-6 py-4">
                      <Link 
                        to={`/message/${customer.id}`}
                        className="block cursor-pointer text-sm text-gray-900 hover:text-sky-700 transition-colors duration-200"
                      >
                        <div className={`${!customer.isRead ? 'font-semibold' : ''}`}>
                          {truncateMessage(customer.lastMessage)}
                        </div>
                      </Link>
                    </td>

                    {/* date column (hidden on mobile) */}
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.date}
                    </td>

                    {/* action column */}
                    <td className="px-3 sm:px-6 py-4">
                      {!customer.isRead ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleMarkAsRead(customer.id);
                          }}
                          className="inline-flex items-center sm:px-3 py-1.5 border border-transparent text-xs font-medium rounded-xl sm:rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-500">
                          ✓ Read
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* empty state */}
        {customers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No messages yet</div>
            <p className="text-gray-400 text-sm mt-2">
              Messages will appear here when you start conversations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;