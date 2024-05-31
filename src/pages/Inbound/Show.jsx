import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Show() {
  const { id } = useParams();
  const [inbound, setInbound] = useState(null);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    instance
      .get(`InboundStuff/${id}`)
      .then((res) => {
        console.log("Data diterima dari API:", res.data.data);
        setInbound(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        } else {
          setError(err.response.data);
        }
      });
  }, [id, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="p-6 bg-gray-300 rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-900">Detail Inbound</h2>
        {Object.keys(error).length > 0 && (
          <div role="alert">
            <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">Gagal!</div>
            <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
              <ul>
                {Object.entries(error).map(([key, value], i) => (
                  <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {inbound && (
          <>
            <div className="flex justify-center mb-4">
              {inbound.proff_file ? (
                <img
                  src={`http://localhost:8000/proof/${inbound.proff_file}`}
                  alt="proof"
                  className="object-cover w-32 h-32 border-2 border-gray-300 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-32 h-32 bg-gray-200 border-2 border-gray-300 rounded-full">
                  Tidak Ada Gambar
                </div>
              )}
            </div>
            <div className="mb-4 text-center">
              <p className="text-lg font-medium text-gray-900">
                <strong>name:</strong> {inbound.stuff ? inbound.stuff.name : "0"}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>total:</strong> {inbound.total}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>date:</strong> {inbound.date}
              </p>
            </div>
          </>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 mt-4 text-white transition duration-200 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
}