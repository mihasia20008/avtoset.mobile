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
        code: '#4001',
        message: 'Успешное создание базы данных',
        data: result,
        trace: 'src/pages/Loading/getInfoFromDb.js:13',
        // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
    },
    err =>
      callback({
        isSuccess: false,
        err,
      }),
  );
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM CLIENTS ',
      [],
      (tx, results) => {
        console.log(results);
        const len = results.rows.length;
        Logger({
          level: 'debug',
          code: '#4002',
          message: 'Запрос на получение списка пользователей',
          data: results,
          trace: 'src/pages/Loading/getInfoFromDb.js:35',
          // eslint-disable-next-line no-console
        }).catch(err => console.log(err));
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
