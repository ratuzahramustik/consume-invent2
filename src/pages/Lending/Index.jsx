import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LendingIndex() {
  const [lendings, setLendings] = useState([]);
  const [error, setError] = useState(null); // Mengubah error menjadi null
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/lending", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setLendings(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Memeriksa jika terdapat respon dari error
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        } else {
          setError("Terjadi kesalahan. Mohon coba lagi."); // Menangani error umum
        }
      });
  }, [navigate]);

  const deleteLending = (id) => {
    axios
      .delete(`http://localhost:8000/lending/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setLendings(lendings.filter((lending) => lending.id !== id)); // Mengupdate lendings setelah penghapusan
      })
      .catch((err) => {
        setError("Gagal menghapus item."); // Menangani error saat penghapusan
      });
  };

  return (
    <Case>
      <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center pt-10 pb-10 m-5">
          <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              Lending
            </h5>
            <div className="flex justify-end">
              <Link
                to={"create"}
                className="inline-flex items-center px-4 py-2 mb-5 ml-3 mr-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-orange-500 dark:bg-orange-500 dark:hover:bg-yellow-700 dark:focus:ring-green-800"
              >
                Create
                <FontAwesomeIcon
                  icon="fa-solid fa-plus"
                  className="w-4 h-4 pl-1 text-inherit"
                />
              </Link>
            </div>
          </div>
          {error && (
            <div role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                Gagal!
              </div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                {error}
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
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama barang
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lendings.map((lending, index) => (
                  <tr key={lending.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.stuff ? lending.stuff.name : "0"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.date_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.total_stuff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.notes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lending.restoration ? (
                        <span className="font-bold text-green-500">
                          Sudah Dikembalikan
                        </span>
                      ) : (
                        <span className="font-bold text-red-500">
                          Belum Dikembalikan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/lending/${lending.id}/show`}
                        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded-lg"
                      >
                        Show
                      </Link>
                      <Link
                        to={`/lending/restoration/${lending.id}`}
                        className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded-lg"
                      >
                        Return
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteLending(lending.id)}
                        className="px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded-lg"
                      >
                        Cancel
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
