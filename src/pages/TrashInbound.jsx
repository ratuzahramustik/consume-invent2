import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../components/Case";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrashInbound() {
  const [trashInbounds, setTrashInbounds] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  useEffect(() => {
    instance
      .get("InboundStuff/trash")
      .then((res) => {
        setTrashInbounds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          navigate(
            "/login?message=" + encodeURIComponent("Anda belum login!")
          );
        }
      });
  }, [navigate]);

  const restoreInbound = (id) => {
    instance
      .get(`InboundStuff/restore/${id}`)
      .then((res) => {
        setTrashInbounds(trashInbounds.filter((inbound) => inbound.id !== id));
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const permanentDeleteInbound = (id) => {
    instance
      .delete(`InboundStuff/permanent/${id}`)
      .then((res) => {
        setTrashInbounds(trashInbounds.filter((inbound) => inbound.id !== id));
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Case>
      <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center pt-10 pb-10 m-5">
          <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              Trash Inbound
            </h5>
            <div className="flex justify-end">
              <Link
                to="/inbound"
                className="inline-flex items-center px-4 py-2 mb-5 ml-3 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Back to Inbound 
              </Link>
            </div>
          </div>
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                Gagal!
              </div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                <ul>
                  {Object.entries(error).map(([key, value], i) => (
                    <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-sm font-light text-left">
              <thead className="text-xs font-medium text-gray-700 uppercase border-b dark:border-neutral-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Total</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4">Photo</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {trashInbounds.map((inbound, index) => (
                  <tr key={inbound.id} className="border-b dark:border-neutral-500">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inbound.stuff_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inbound.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{inbound.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={`http://localhost:8000/proff/${inbound.proff_file}`} className="object-cover w-16 h-16 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => restoreInbound(inbound.id)}
                        className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded-lg"
                      >
                        Restore
                      </button>
                      <button
                        type="button"
                        onClick={() => permanentDeleteInbound(inbound.id)}
                        className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg"
                      >
                        Permanent Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Case>
  );
}