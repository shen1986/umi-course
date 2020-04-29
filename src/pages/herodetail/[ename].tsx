import React, {
    FC,
} from 'react';
import styles from './ename.less';
import { IRouteComponentProps } from 'umi'

const herodetail: FC<any> = ({ match, isExact }) => {
    //    isExact: true
    //    params:
    //        ename: "123"
    //    path: "/herodetail/:ename"
    //    url: "/herodetail/123"
    console.log(match);
    return (
        <div className={styles.normal}>
            <h1>herodetail Page ename</h1>
        </div>
    );
}

export default herodetail;
