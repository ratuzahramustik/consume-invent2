import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function InboundCreate() {
    const [stuffs, setStuffs] = useState([])
    let forms = new FormData()
    // const [forms, setForms] = useState({
    //     stuff_id: '',
    //     total: '',
    //     date: '',
    //     proof_file: ''
    // })
   
    const [error, setError] = useState([])


    const navigate = useNavigate()


    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })


    useEffect(() => {
        instance.get('stuff', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then(res => {
                setStuffs(res.data.data)
            })
            .catch(err => {
                if (err.response.status == 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'))
                }
            })
    }, [navigate])


    const handleCreateInbound = (event) => {
        event.preventDefault();


        instance.post('InboundStuff', forms)
            .then(res => {
                navigate('/inbound')
            })
            .catch(err => {
                console.log(err)
                let errMsg = (err.response.data.length !== 0) ? ((err.response.data.data.length === 0) ? err.response.data.message : err.response.data.data) : err.response
                showErrorMessage(errMsg)
                setError(errMsg)
                // setError(err.response.data.data ? err.response.data.data : err.response.data)
                console.log(err)
            })
    }
    return (
        <Case>
            <div className="block h-screen m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center pt-10 pb-10 m-5">
                        {
                            Object.keys(error).length > 0 ? (
                                <div role="alert">
                                    <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                                        Gagal!
                                    </div>
                                    <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                                        <ul>
                                            {
                                                typeof error == 'string' ? (
                                                    error
                                                ) : (
                                                    Object.entries(error).map(([key, value], i) => (
                                                        <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ) : ''
                        }
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Inbound</h5>
                    </div>
                    <form onSubmit={handleCreateInbound} class="max-w-sm mx-auto">
                        <div class="mb-5">
                            <label for="stuff_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Stuff</label>
                            <select id="stuff_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" onChange={e => forms.append("stuff_id", e.target.value)}>
                                <option selected>Choose Stuff</option>
                                {
                                    stuffs.map((stuff) => (
                                        <option value={stuff.id}>{stuff.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div class="mb-5">
                            <label for="total" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Stuff</label>
                            <input type="number" id="total" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Ketik Total Barang" onChange={e => forms.append("total", e.target.value)} />
                        </div>
                        <div class="mb-5">
                            <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Goods Entered</label>
                            <input type="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Ketik Nama Barang" onChange={e => forms.append("date", e.target.value)} />
                        </div>
                        <div class="mb-5">
                            <label for="proof_file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Goods Entered</label>
                            <input type="file" id="proof_file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Ketik Nama Barang" onChange={e => {
                              console.log(e.target.files[0]);
                              forms.append("proff_file", e.target.files[0]);
                              newTab.onload = function() {
                                  newTab.postMessage(imageData, 'url_tab_tujuan');
                              };
                            }} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </Case>
    )
}
