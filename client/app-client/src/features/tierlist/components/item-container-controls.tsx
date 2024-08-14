import CreateItemDialog from './create-item-dialog';

interface ItemsContainerControlsProps {
    addItem: (name: string) => void;
}

function ItemsContainerControls(props: ItemsContainerControlsProps) {
    return (
        <div className="p-5">
            <CreateItemDialog addItem={props.addItem}/>
        </div>
    );
}

export default ItemsContainerControls;