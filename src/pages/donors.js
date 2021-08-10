import React, { useEffect } from 'react';
import * as styles from '../styles/pages/history.module.scss';
import BaseLayout from '../layout/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonorList } from '../actions'

const History = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(fetchDonorList());
  }, []);

  const donors = useSelector(state => state.donor.list);
  const tableHeaders = ['Secret Address', 'Status', 'Transaction', 'Amount', 'Time'];

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
            {donors && donors.map((donor, index) => {
              return (<tr key={index}>
                <td>{donor.address}</td>
                <td>{donor.type}</td>
                <td>{donor.transaction_hash}</td>
                <td>{ parseFloat(donor.amount)/1000000 }</td>
                <td>{donor.createdAt}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </BaseLayout>        
  );
};

export default History;
