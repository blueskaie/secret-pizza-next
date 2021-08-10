import React from 'react';
import * as styles from '../styles/pages/main-container.module.scss';
import BaseLayout from '../layout/BaseLayout';
import PizzaForm from '../components/pizzaForm';

const MainContainer = () => {
    return (
        <BaseLayout>
            <div className={styles.mainContainer}>
                <PizzaForm/>
            </div>
        </BaseLayout>
    );
};

export default MainContainer;
