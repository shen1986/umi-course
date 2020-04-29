import { Effect, Reducer, request, Subscription } from 'umi';

interface ItemProps {
    item_id: number
    item_name: string
    item_type: number
    price: number
    total_price: number
    des1: string
}

export interface ItemModelState {
    name: string;
    items: ItemProps[];
    filterKey: number
}

export interface ItemModelType {
    namespace: 'item';
    state: ItemModelState;
    effects: {
        query: Effect;
        fetch: Effect;
    };
    reducers: {
        save: Reducer<ItemModelState>;
    };
    subscriptions: { setup: Subscription };
}

const ItemModel: ItemModelType = {
    namespace: 'item',

    state: {
        name: 'item',
        items: [],
        filterKey: 0,
    },

    effects: {
        *query({ payload }, { call, put }) {
            const data = yield request('/itemdetails.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    item_id: 1111,
                }),
            });
        },
        *fetch({ payload }, { call, put }) {
            const data = yield request('/itemlist.json');
            yield put({
                type: 'save',
                payload: {
                    items: data,
                },
            });
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    subscriptions : {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/item') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    }
};

export default ItemModel;
