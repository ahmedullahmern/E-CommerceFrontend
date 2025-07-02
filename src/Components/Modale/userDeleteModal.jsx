import { useState } from 'react';
import ButtonLoader from '../Loader/ButtonLoader'; // already made loader

const ConfirmUserDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        await onConfirm(); // yeh `handleDeleteConfirm()` ko call karega
        setIsDeleting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h2>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-black rounded"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded flex items-center justify-center min-w-[100px]"
                        disabled={isDeleting}
                    >
                        {isDeleting ? <ButtonLoader size="sm" /> : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmUserDeleteModal;
