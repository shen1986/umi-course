import { Effect, Reducer, Subscription, request } from 'umi';

export interface HeroProps {
    ename: number;
    cname: string;
    title: string;
    new_type: number;
    hero_type: number;
    skin_name: string;
}

export interface HeroModelState {
    name: string;
    heros: HeroProps[];
    filterKey: number
    freeheros: HeroProps[],
    itemHover: number
}

export interface HeroModelType {
    namespace: 'hero';
    state: HeroModelState;
    effects: {
        query: Effect;
        fetch: Effect;
    };
    reducers: {
        save: Reducer<HeroModelState>;
    };
    subscriptions: { setup: Subscription }
}

const HeroModel: HeroModelType = {
    namespace: 'hero',

    state: {
        name: 'hero',
        heros: [],
        filterKey: 0,
        freeheros: [],
        itemHover: 0,
    },

    effects: {
        *query({ payload }, { call, put }) {
            const data = yield request('/herodetails.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    ename: 110,
                }),
            });
        },
        *fetch({ type, payload }, { put, call, select }) {
            const data = yield request('/herolist.json');
            const freeheros = yield request('mock/freeheros.json', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    number: 10,
                }),
            });
            const localData = [
                {
                    ename: 105,
                    cname: '廉颇',
                    title: '正义爆轰',
                    new_type: 0,
                    hero_type: 3,
                    skin_name: '正义爆轰|地狱岩魂',
                },
                {
                    ename: 106,
                    cname: '小乔',
                    title: '恋之微风',
                    new_type: 0,
                    hero_type: 2,
                    skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
                },
            ];
            yield put({
                type: 'save',
                payload: {
                    heros: data || localData,
                    freeheros: freeheros,
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
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/hero') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    }
};

export default HeroModel;
