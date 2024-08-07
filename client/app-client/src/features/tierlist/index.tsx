import ItemContainer from './components/item-container';
import ItemContainerControls from './components/item-container-controls';
import RankContainer from './components/rank-container';
import { useState } from 'react';
import type { Item } from './types/Item';

function TierListPage() {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = () => {
        const colors = ['bg-amber-300', 'bg-rose-400', 'bg-stone-300', 'bg-cyan-400', 'bg-violet-700', 'bg-pink-800'];
        let randomColor = colors[Math.floor(Math.random() * 6)];
        let item = { color: randomColor};
        setItems([...items, item]);
    };

    return (
        <div>
            <RankContainer />
            <div className="flex flex-col">
                <ItemContainerControls addItem={addItem}/>
                <ItemContainer items={items}/>
            </div>
        </div>
    );
}

export default TierListPage;