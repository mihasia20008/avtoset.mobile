// import * as types from './actionTypes';

const initialState = {
  isFetching: false,
  list: [
    {
      barcode: '5672344780068',
      name: 'A deleniti voluptas quis ducimus.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Sit distinctio ut culpa.',
      date_start: '1999-04-25',
      date_finish: '2009-02-24',
      active: true,
    },
    {
      barcode: '1771755517721',
      name: 'Minima dolor corrupti architecto.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Eum et vel doloremque.',
      date_start: '2015-03-10',
      date_finish: '2015-03-24',
      active: true,
    },
    {
      barcode: '8973704622330',
      name: 'Qui rerum ipsa voluptas est nesciunt temporibus dolor.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Magnam ut ipsum est.',
      date_start: '1998-02-27',
      date_finish: '1987-10-24',
      active: true,
    },
    {
      barcode: '6564488356638',
      name: 'Et natus quas sint explicabo sint corrupti laborum.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Tenetur quaerat vel ex.',
      date_start: '1994-12-29',
      date_finish: '2018-08-13',
      active: true,
    },
    {
      barcode: '0751686946310',
      name: 'Atque eligendi sequi fugiat velit rerum quia qui quia.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Delectus autem quod ut.',
      date_start: '2004-05-20',
      date_finish: '2011-08-16',
      active: true,
    },
    {
      barcode: '9370962445364',
      name: 'Autem magni est veniam nemo quo.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Quia sed id id non quas.',
      date_start: '1978-03-23',
      date_finish: '1986-04-17',
      active: true,
    },
    {
      barcode: '2393084208928',
      name: 'Ullam sit praesentium magnam corporis.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Id ut et et.',
      date_start: '1987-12-09',
      date_finish: '1980-03-20',
      active: true,
    },
    {
      barcode: '4010538069611',
      name: 'Ut ipsa voluptatem eum magni possimus.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Aut aut velit et nemo.',
      date_start: '1977-08-17',
      date_finish: '1991-06-02',
      active: true,
    },
    {
      barcode: '8600635799724',
      name: 'Aspernatur numquam sunt voluptatibus.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Saepe earum fugit eos.',
      date_start: '2009-05-27',
      date_finish: '1987-09-27',
      active: true,
    },
    {
      barcode: '9796846686331',
      name: 'Iste autem qui illo iusto blanditiis odit.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Labore ipsam quos porro.',
      date_start: '1998-01-04',
      date_finish: '1971-02-02',
      active: true,
    },
    {
      barcode: '4915948503635',
      name: 'Alias sed aut ab perferendis eos. Eum quia rerum sit.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'Eos dicta ea beatae.',
      date_start: '2007-12-03',
      date_finish: '1999-10-10',
      active: false,
    },
    {
      barcode: '9607327560753',
      name: 'Voluptatibus inventore libero iusto et distinctio.',
      image_url: '/upload/images/AGbwKWceUeBvqAwHm8buHN6SCvSjhtv2mEHCTrQA.png',
      offer: 'At aperiam id et quia.',
      date_start: '1976-03-18',
      date_finish: '1990-04-26',
      active: false,
    },
  ],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};
