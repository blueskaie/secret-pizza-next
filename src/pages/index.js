import React, {useState, useEffect} from 'react';
import * as styles from '../styles/pages/main-container.module.scss';
import BaseLayout from '../layout/BaseLayout';
import PizzaForm from '../components/pizzaForm';
import Notification from '../components/notification';

const MainContainer = () => {
    return (
        <BaseLayout>
            <div className={styles.mainContainer}>
                <PizzaForm tab={1}/>
            </div>
        </BaseLayout>
    );
};

export default MainContainer;
