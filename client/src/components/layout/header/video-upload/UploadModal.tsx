import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { UploadForm } from './upload-form/UploadForm';
import { IVideoModal } from './VideoUpload.interface'
import styles from './VideoUpload.module.scss';

export const UploadModal: FC<IVideoModal> = ({ setIsOpen, isOpen }) => {

    const handleCloseModal = () => setIsOpen(false);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>

                <Dialog as="div"  className={styles.dialog_wrapper} onClose={handleCloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className={styles.panel_wrapper}>
                        <div>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={styles.panel}>
                                    <UploadForm handleCloseModal={handleCloseModal}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
