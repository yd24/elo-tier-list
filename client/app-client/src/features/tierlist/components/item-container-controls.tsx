interface ItemsContainerControlsProps {
    addItem: () => void;
}

function ItemsContainerControls(props: ItemsContainerControlsProps) {
    return (
        <div className="p-5">
            <button className="bg-slate-300" onClick={props.addItem}>Add Item</button>
        </div>
    );
}

export default ItemsContainerControls;