import { useState } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../components/ui/dialog";

interface CreateItemDialogProps {
    addItem: (name: string) => void;
}

function CreateItemDialog(props: CreateItemDialogProps) {
    const [itemName, setItemName] = useState('');
    const [open, setOpen] = useState(false);
    const [dialogError, setDialogError] = useState(false);
    const itemNameValidation = z.string().min(1).max(50);

    const addItemHandler = () => {
        try {
            itemNameValidation.parse(itemName);
            setDialogError(false);
            props.addItem(itemName);
            setItemName('');
            setOpen(false);
        } catch (error) {
            setDialogError(true);
        }

    }

    const itemNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-white hover:bg-slate-200 px-5 py-2">Create New Item</DialogTrigger>
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
                <button className="bg-slate-300 px-4 py-1" onClick={addItemHandler}>Add Item to List</button>
                <DialogFooter className="text-red-500">
                    {dialogError &&
                        <p>Error: Name is invalid.</p>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateItemDialog;
