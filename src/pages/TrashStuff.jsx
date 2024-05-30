import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrashStuff() {
  const [trashs, setTrashs] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  useEffect(() => {
    instance
      .get("stuff/trash", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setTrashs(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        }
      });
  }, [navigate]);

  const restoreStuff = (id) => {
    instance.put(`stuff/restore/${id}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setTrashs(trashs.filter((stuff) => stuff.id !== id));
        navigate("/stuff");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const deleteStuff = (id) => {
    instance
      .delete(`stuff/permanent/${id}`)
      .then((res) => {
        location.reload();
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
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Trash Stuff</h5>
            <div className="flex justify-end">
              <Link to='/stuff' className="inline-flex items-center px-4 py-2 mb-5 ml-3 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800">Back to Stuff</Link>
            </div>
          </div>
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">Gagal!</div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                <ul>{error.message}</ul>
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-sm font-light text-left">
              <thead className="text-xs font-medium text-gray-700 uppercase border-b dark:border-neutral-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Total Available</th>
                  <th scope="col" className="px-6 py-4">Total Defec</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {trashs.map((stuff, id) => (
                  <tr key={stuff.id} className="border-b dark:border-neutral-500">
                    <td className="px-6 py-4 whitespace-nowrap">{id + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stuff.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stuff.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stuff.stock ? stuff.stock.total_available : "0"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stuff.stock ? stuff.stock.total_defec : "0"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button type="button" onClick={() => restoreStuff(stuff.id)} className="px-4 py-2 mr-2 font-bold text-white bg-orange-500 rounded-lg">
                        Restore
                      </button>
                      <button type="button" onClick={() => deleteStuff(stuff.id)} className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg">
                        Hapus Permanent
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