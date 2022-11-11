import { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { IDialog } from './Dialog.interface';
import styles from './Dialog.module.scss';

const ConfirmationDialog: FC<IDialog> = ({ message, onDialog, isOpen, setIsOpen }) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className={styles.container}
        >
            <div className={styles.wrapper}>
                <Dialog.Panel className={styles.panel_wrapper}>
                    <Dialog.Title className={styles.panel_title}>Confirm the action</Dialog.Title>
                    <p className={styles.panel_msg}>
                        {message}
                    </p>
                    <div className={styles.panel_buttons}>
                        <button onClick={() => { setIsOpen(false); onDialog() }}>Confirm</button>
                        <button onClick={() => { setIsOpen(false) }}>Cancel</button>

                    </div>

                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default ConfirmationDialog;