import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";

export default function Inbound() {
    const [inbounds, setInbounds] = useState([])

    const navigate = useNavigate()

    const [error, setError] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {
        instance
          .get("InboundStuff")
          .then((res) => {
            console.log(res.data.data);
            setInbounds(res.data.data);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              navigate(
                "/login?message=" + encodeURIComponent("Anda Belum Login!")
              );
            }
          });
    }, [navigate])

    const deleteInbound = (id) => {
        instance.delete(`InboundStuff/${id}`)
            .then(res => {
                location.reload();
            })
            .catch(err => {
                setError(err.response.data)
                console.log(err.response.data)
            })
    }

    return (
      <Case>
        <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="items-center pt-10 pb-10 m-5">
            <div className="flex justify-between">
              <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
                Inbound
              </h5>
              <div className="flex justify-end">
                <Link
                  to={"/inbound/create"}
                  className="px-4 py-2 text-white bg-teal-700 rounded-lg shadow-md border-sky-500"
                >
                  Create
                  <FontAwesomeIcon
                    icon="fa-solid fa-plus"
                    className="w-4 h-4 pl-1 text-inherit"
                  />
                </Link>
                <Link
                  to={"/inbound/trash"}
                  className="px-4 py-2 text-white bg-teal-700 rounded-lg shadow-md border-sky-500"
                >
                  Trash
                  <FontAwesomeIcon
                    icon="fa-solid fa-plus"
                    className="w-4 h-4 pl-1 text-inherit"
                  />
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
                    <li>{error.message}</li>
                  </ul>
                </div>
              </div>
            )}
            <div className="flex mt-4 md:mt-6">
              <table className="min-w-full text-sm font-light text-left">
                <thead className="text-xs font-medium text-gray-700 uppercase border-b dark:border-neutral-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Id Stuff
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total Stuff
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date Stuff Entered
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Proof
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {inbounds.map((inbound, id) => (
                    <tr
                      key={inbound.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{id + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inbound.stuff ? inbound.stuff.name : "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inbound.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inbound.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inbound.proff_file && (
                          <a href={`http://localhost:8000/proof/${inbound.proff_file}`}>
                            <img
                              src={`http://localhost:8000/proof/${inbound.proff_file}`}
                              alt="Proff File"
                              className="object-cover w-20 h-20"
                            />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/inbound/${inbound.id}/show`}
                          className="px-4 py-2 mr-2 font-bold text-white bg-orange-500 rounded-lg"
                        >
                          Show
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteInbound(inbound.id)}
                          className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg"
                        >
                          Delete
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