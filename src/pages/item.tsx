import React, {
    FC,
} from 'react';
import { connect, ItemModelState, ConnectProps } from 'umi';
import {
    Row,
    Col,
    Card,
    Radio,
} from 'antd'
import styles from './item.less';

interface PageProps extends ConnectProps {
    item: ItemModelState;
}

const RadioGroup = Radio.Group;
const itemType = [
    { key: 0, value: '全部' },
    { key: 1, value: '攻击' },
    { key: 2, value: '法术' },
    { key: 3, value: '防御' },
    { key: 4, value: '移动' },
    { key: 5, value: '打野' },
    { key: 7, value: '辅助' },
];

const Item: FC<PageProps> = (props) => {
    const {
        item,
        dispatch,
    } = props;
    const { items = [], filterKey = 0  } = item;
    const onChange = (e: any) => {
        if (dispatch) {
            dispatch({
                type: "item/save", payload: {
                    filterKey: e.target.value
                }
            })
        }
    };
    return (
        <div>
            <Row>
                <Card className={styles.radioPanel}>
                    <RadioGroup onChange={onChange} value={filterKey}>
                        {itemType.map(data => (
                            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
                                {data.value}
                            </Radio>
                        ))}
                    </RadioGroup>
                </Card>
            </Row>
            <Row>
                {items
                    .filter(item => filterKey === 0 || item.item_type === filterKey)
                    .reverse()
                    .map(item => (
                    <Col key={item.item_id} span={3} className={styles.iitem}>
                        <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`} />
                        <p>{item.item_name}</p>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default connect(({ item }: { item: ItemModelState }) => ({ item }))(Item);
