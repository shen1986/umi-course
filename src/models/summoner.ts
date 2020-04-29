import { Effect, Reducer, request, Subscription } from 'umi';

export interface SummonerModelState {
    name: string;
    summoners: []
}

export interface SummonerModelType {
    namespace: 'summoner';
    state: SummonerModelState;
    effects: {
        query: Effect;
        fetch: Effect;
    };
    reducers: {
        save: Reducer<SummonerModelState>;
    };
    subscriptions: { setup: Subscription };
}

const SummonerModel: SummonerModelType = {
    namespace: 'summoner',

    state: {
        name: 'summoner',
        summoners:[],
    },

    effects: {
        *query({ payload }, { call, put }) {

        },
        *fetch({ payload }, { call, put }) {
            const data = yield request('/summonerdetails.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    summoner_id: 80104,
                }),
            });
            yield put({
                type: 'save',
                payload: {
                    summoners: data,
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
                if (pathname === '/summoner') {
                    dispatch({
                        type: 'fetch'
                    })
                }
            });
        }
    }
};

export default SummonerModel;
