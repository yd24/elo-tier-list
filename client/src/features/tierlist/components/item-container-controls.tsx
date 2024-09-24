import CreateItemDialog from './create-item-dialog';
import { Dialog, DialogTrigger } from '../../../components/ui/dialog';

interface ItemsContainerControlsProps {
    addItem: (name: string) => void;
    resetItems: () => void;
}

function ItemsContainerControls(props: ItemsContainerControlsProps) {
    return (
        <div className="flex">
            <div className="p-5">
                <CreateItemDialog addItem={props.addItem}/>
            </div>
            <div className="p-5">
                <Dialog>
                    <DialogTrigger className="bg-white hover:bg-slate-200 px-5 py-2" onClick={props.resetItems}>Reset Items</DialogTrigger>
                </Dialog>
            </div>
        </div>
    );
}

export default ItemsContainerControls;