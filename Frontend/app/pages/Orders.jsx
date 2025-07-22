import { Link } from "react-router";
import { ordersData } from "../data";
import { Mail } from "lucide-react";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: false,
  };

  const manageContact = (orderId) => {
    console.log(`Delete order with id: ${orderId}`);
  };
  

  return (
    // Orders
    <div className=" mb-8 bg-gray-50 py-8">
      {/* container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {currentUser.isSeller ? "Gigs" : "Orders"}
          </h1>
        </div>

        {/* table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Order
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {currentUser.isSeller ? 'Seller' : 'Buyer'}
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersData.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <td className="px-3 sm:px-6 py-4">
                      {/* image */}
                      <img
                        className="h-12 w-12 sm:h-16 transition hover:scale-105 bg-center sm:w-16 rounded-lg object-cover"
                        src={order.image}
                        alt={order.title}
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="line-clamp-2 sm:line-clamp-1 hover:text-sky-700">
                        {order.title}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 hover:text-sky-700 text-sm text-gray-900 font-semibold">
                      {order.name}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 text-sm text-gray-500">
                      {order.price}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {/* contact */}
                      <button
                        onClick={() => manageContact(order.id)}
                        className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200"
                      >
                        <Mail className='size-4 hover:bg-sky-300 transform hover:rounded-sm hover:scale-115' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;