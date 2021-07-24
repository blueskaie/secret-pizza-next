import React from 'react';
import * as styles from '../styles/pages/history.module.scss';
import BaseLayout from '../layout/BaseLayout';

const History = () => {
  const tableHeaders = ['Secret Address', 'Status', 'Transaction', 'Amount', 'Time'];
  const tableBodys = [
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
    ['secre...wqv4a', 'Donor', 'tx120392023923', '100.27', '25.06.2021 11:40'],
  ];
  return (
    <BaseLayout>
      <div className={styles.historyContainer}>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => {
                return <th key={index}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableBodys.map((row, index) => {
              return (<tr key={index}>
                {row.map((col, index) => {
                  return <td key={index}>{col}</td>;
                })}
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </BaseLayout>        
  );
};

export default History;
