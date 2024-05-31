import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const [forms, setForms] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  const handleCreateUser = (event) => {
    event.preventDefault();

    instance
      .post("User", forms)
      .then((res) => {
        navigate("/user");
      })
      .catch((err) => {
        setError(err.response.data.data);
        console.log(err.response);
      });
  };
  return (
    <Case>
      <div className="block h-screen m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center pt-10 pb-10 m-5">
          {Object.keys(error).length > 0 ? (
            <div role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                Gagal!
              </div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                <ul>
                  {Object.entries(error).map(([key, value], i) => (
                    <li key={key}>
                      {key != "status" ? i + 1 + ". " + value : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-center">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              User
            </h5>
          </div>
          <form onSubmit={handleCreateUser} class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ketik Username"
                required
                onChange={(e) =>
                  setForms({ ...forms, username: e.target.value })
                }
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ketik Email"
                required
                onChange={(e) => setForms({ ...forms, email: e.target.value })}
              />
            </div>
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ketik Password"
                required
                onChange={(e) =>
                  setForms({ ...forms, password: e.target.value })
                }
              />
            </div>
            <div class="mb-5">
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setForms({ ...forms, role: e.target.value })}
              >
                <option selected>Choose Category</option>
                <option value="staff">Stuff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Case>
  );
}
