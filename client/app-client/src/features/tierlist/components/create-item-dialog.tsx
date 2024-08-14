import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";

interface CreateItemDialogProps {
    addItem: (name: string) => void;
}

function CreateItemDialog(props: CreateItemDialogProps) {
    const [itemName, setItemName] = useState('');

    const addItemHandler = () => {
        props.addItem(itemName);
    }

    const itemNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-slate-200 px-5 py-2">Create New Item</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create New Item
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-col mb-3">
                    <div className="flex gap-5 py-2">
                        <label>
                            Item Name
                        </label>
                        <input className="border-2 border-slate-300" type="text" onChange={itemNameHandler}/>
                    </div>
                    <div className="flex gap-5">
                        <label>
                            Upload Image
                        </label>
                        <input type="file" />
                    </div>
                </div>
                <DialogClose className="flex">
                    <button className="bg-slate-300 px-4 py-1" onClick={addItemHandler}>Add Item to List</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}

export default CreateItemDialog;
