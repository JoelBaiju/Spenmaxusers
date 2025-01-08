import React from 'react'

function DeletePackageModal({id,closeDeleteModal,deletePackage}) {
    
    return (
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black/5 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeDeleteModal}
                >
                    <div
                        className="bg-white p-5 rounded-lg shadow- max-w-sm w-11/12 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Delete Package ?</h2>
                        <p className="text-gray-600">Confirm to delete package</p>
                        <div className='flex items-center mt-5 justify-center'>
                            <div className='p-1 px-4 cursor-pointer' >
                                <button onClick={() => { deletePackage(id) }} className='flex items-center'>Delete<img src="/delete (3).png" alt="" className='w-5 ' /></button>
                            </div>
                            <button className=" px-4 py-2 " onClick={closeDeleteModal} >
                                Cancel <i class="fa-solid opacity-85 fa-xmark fa-2xl"></i>
                            </button>
                        </div>

                    </div>
                </div>


    )
}

export default DeletePackageModal
