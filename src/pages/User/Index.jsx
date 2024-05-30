import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function User() {
  const [users, setUsers] = useState([]);
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
      .get("User", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        }
      });
  }, [navigate]);

  const deleteUser = (id) => {
    instance
      .delete(`User/${id}`)
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
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              User
            </h5>
            <div className="flex justify-end">
              <Link
                to={"/user/create"}
                className="inline-flex items-center px-4 py-2 mb-5 ml-3 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-green-800"
              >
                Create
              </Link>
              <Link
                to={"/user/trash"}
                class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5"
              >
                Trash
              </Link>
            </div>
          </div>
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                Gagal!
              </div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                <ul>{error.message}</ul>
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-sm font-light text-left text-white">
              <thead className="text-xs font-medium text-gray-700 uppercase border-b dark:border-neutral-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, id) => (
                  <tr
                    key={user.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{id + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/user/${user.id}/edit`}
                        className="px-4 py-2 mr-2 font-bold text-white bg-purple-500 rounded-lg"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/user/${user.id}/show`}
                        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded-lg"
                      >
                        Show
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Yakin ingin menghapus?")) {
                            deleteUser(user.id);
                          }
                        }}
                        className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg"
                      >
                        Delete
                      </button>
                      {/* <button type="button" onClick={() => deleteStuff(stuff.id)} className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg">
                        Hapus
                      </button> */}
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
