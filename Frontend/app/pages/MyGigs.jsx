import { Link } from "react-router";
import { gigsData } from "../data";
import { Trash } from "lucide-react";

const MyGigs = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };



  const handleDelete = (gigId) => {
    console.log(`Delete gig with id: ${gigId}`);
  };


  return (
    // myGigs
    <div className="bg-gray-50 pb-16 pt-8">
      {/* container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {currentUser.isSeller ? "My Gigs" : "Orders"}
          </h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 text-sm sm:text-base">
                Add New Gig
              </button>
            </Link>
          )}
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
                    Title
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gigsData.map((gig) => (
                  <tr key={gig.id} className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <td className="px-3 sm:px-6 py-4">
                      {/* image */}
                      <img
                        className="h-12 w-12 sm:h-16 transition hover:scale-105 bg-center sm:w-16 rounded-lg object-cover"
                        src={gig.image}
                        alt={gig.title}
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="line-clamp-2 sm:line-clamp-1 hover:text-sky-700">
                        {gig.title}
                      </div>
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        Sales: {gig.sales}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 hover:text-sky-700 text-sm text-gray-900 font-semibold">
                      {gig.price}
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {gig.sales}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {/* delete */}
                      <button
                        onClick={() => handleDelete(gig.id)}
                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200"
                      >
                        <Trash className='size-4 hover:fill-rose-300' />
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

export default MyGigs;