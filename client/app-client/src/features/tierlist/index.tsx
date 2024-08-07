import ItemContainer from './components/item-container';
import ItemContainerControls from './components/item-container-controls';
import RankContainer from './components/rank-container';

function TierListPage() {
    return (
        <div>
            <RankContainer />
            <div>
                <ItemContainerControls />
                <ItemContainer />
            </div>
        </div>
    );
}

export default TierListPage;