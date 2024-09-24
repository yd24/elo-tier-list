import uuid from "react-uuid";

export type ItemType = {
    id: string,
    title: string,
}

export function createItem(title: string) {
    const newUuid = `Item-${uuid()}`;
    return {id: newUuid, title: title};
};