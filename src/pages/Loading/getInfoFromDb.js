import SQLite from 'react-native-sqlite-storage';

import { Logger } from '../../services/utilities';

export default callback => {
  /* eslint-disable */
  const db = SQLite.openDatabase(
    'AvtosetDataBase',
    '1.5.0',
    'AvtosetDataBase',
    4194304,
    (tx, result) => {
      Logger({
        level: 'debug',
        code: '#4004',
        message: 'Успешное создание базы данных',
        data: result,
        trace: 'src/pages/Loading/index.js:57',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
    },
    err =>
      callback({
        isSuccess: false,
        err,
      }),
  );
  // tx.executeSql(
  //   'SELECT * FROM CLIENTS ',
  //   [],
  //   (tx, results) => {
  //     const len = results.rows.length;
  //     if (!len) {
  //       callback({
  //         isSuccess: false,
  //         err: 'Нет данных об авторизации',
  //       });
  //       return;
  //     }
  //     callback({
  //       isSuccess: true,
  //       user: results.rows.item(0),
  //     });
  //   },
  //   (tx, result) => {
  //     callback({
  //       isSuccess: false,
  //       err: result,
  //     });
  //   },
  // );
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS CLIENTS (ID,USER,CAR) ',
      [],
      (tx, result) => {
        Logger({
          level: 'debug',
          code: '#4005',
          message: 'Успешное создание таблицы Clients',
          data: result,
          trace: 'src/pages/Loading/index.js:77',
          // eslint-disable-next-line no-console
        }).catch(err => console.log(err));
      },
      (tx, result) =>
        callback({
          isSuccess: false,
          err: result,
        }),
    );
    tx.executeSql(
      'SELECT * FROM CLIENTS ',
      [],
      (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          callback({
            isSuccess: false,
            err: 'Нет данных об авторизации',
          });
          return;
        }
        callback({
          isSuccess: true,
          user: results.rows.item(0),
        });
      },
      (tx, result) => {
        callback({
          isSuccess: false,
          err: result,
        });
      },
    );
  });
  /* eslint-enable */
};
