import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

export default function Table({ headers, data, endpoint, inpuData, titleModal, IdentitasColumn }) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndPointToSend] = useState([]);

    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "delete" : replaceUrlDelete,
        }
        setEndPointToSend(endpointReplaced);
        setIsModalDeleteOpen(true)
    }
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headers.map((header, index) => (
                    <th scope="col" class="px-6 py-3" key={index}>{header}</th>
                ))}
                <th scope="col" class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody>
            {
                Object.entries(data).map(([index, item]) => (
                    <>
                     <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index) + 1}.</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? 
                    item.stuff_stock.total_available : '0'}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? 
                    item.stuff_stock.total_defec : '0'}</td>

                    {/* <!-- aksi --> */}
                    <td class="px-6 py-4 text-right">
                        <button type="button" class="font-medium text-blue-600 dark:text-blue-500 
                        hover:underline">Edit</button>
                        <button type="button" onClick={() => handleModalDelete(item.id)} class="font-medium 
                        text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                    </td>
                </tr>
            </>
        ))
    }

    return (
        <Case>
            <Table headers={headers} data={stuffs}></Table>
        </Case>
    );
     <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointToSend} 
     identitasColumn={identitasColumn}></ModalDelete>
    <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inpuData}></ModalEdit>
    </tbody>
    </table>
    </div>
  )
}