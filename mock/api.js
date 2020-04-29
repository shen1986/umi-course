import herolist from './herolist.json';
import itemlist from './item.json';
import summonerlist from './summoner.json';

export default {
    'POST /apimock/freeheros.json': (req, res) => {
        const { number } = req.body;
        function getRandomArrayElements(arr, count) {
            var shuffled = arr.slice(0),
                i = arr.length,
                min = i - count,
                temp,
                index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
        const freeheros = getRandomArrayElements(herolist, number);
        res.send(freeheros);
    },
    '/api/herolist.json': herolist,
    'POST /api/herodetails.json': (req, res) => {
        const { ename } = req.body;
        const hero = herolist.filter(
            item => item.ename === parseInt(ename, 10),
        )[0];
        res.send(hero);
    },
    '/api/itemlist.json': itemlist,
    'POST /api/itemdetails.json': (req, res) => {
        const { item_id } = req.body;
        const item = itemlist.filter(
            item => item.item_id === parseInt(item_id, 10),
        )[0];
        res.send(item);
    },
    'POST /api/summonerdetails.json': (req, res) => {
        const { summoner_id } = req.body;
        const item = summonerlist.filter(
            item => item.summoner_id === parseInt(summoner_id, 10),
        )[0];
        res.send(item);
    },
};
