/*


  Giving workflows state


*/
import { createReducer } from "../../utilities";
import types from "../types";

import progress from "./progress";
import savedAccount from "./savedAccounts";
import { addTransaction, clearTransaction, clearTransactions } from "./transactions";
import {
  setRecoverableSchedule,
  deleteRecoverableSchedule,
  setRecoverableSchedules,
  deleteRecoverableSchedules,
} from "./scheduledTransactions";

export const initial = {

  userId: null, // used in native => web transactions

  step: 1, // Number (step along in progress bar to show)
  transactionType: "default", // "default", "guest", "recurring"
  url: "", // String representing the endpoint with NMI to submit to
  total: 0, // Number > 0 for allowing to move forward (calculated)
  state: "default", // "default", "loading", "submit", "error", "success"
  attempts: 0, // spam protection (auto calculated)
  reminderDate: null, // Date string for the next reminder

  errors: {
    // <id>: {
    //   message: "Card is declined"
    // }
  },

  savedAccount: {
    id: null, // Id of saved account to charge
    payment: {
      accountNumber: null, // accountNumber to be shown (full, not just last four)
      paymentType: null, // type of card
    },
    name: null, // name of card
  },

  accounts: {
    // <accountId>: Name
  },

  // transaction data
  transactions: {
    // <accountId>: Number // <accountId>: $ of gift
  },

  schedule: {
    start: null,  // Date (YYYYMMDD)
    // payments: null,  future feature for pledges
    frequency: null, // String of value from Rock
  },

  scheduleToRecover: null,
  recoverableSchedules: {

  },

  // form data
  data: {
    personal: {
      firstName: null, // String
      lastName: null, // String
      email: null, // String
      campus: null, // String
      campusId: null, // Number
    },
    billing: {
      streetAddress: null, // String
      streetAddress2: null, // String
      city: null, // String
      state: null, // String
      zip: null, // Number
      country: null, // String
    },
    payment: {
      name: null,
      type: "cc", // String ach or cc
      cardNumber: null, // Number
      expiration: null, // String
      ccv: null, // Number
      account: null, // String (for safety with international numbers)
      routing: null, // String (for safety with international numbers)
    },
  },

};

export default createReducer(initial, {

  [types.SET_PROGRESS]: progress,

  [types.SET_SAVED_ACCOUNT]: savedAccount,

  [types.ADD_TRANSACTION]: addTransaction,
  [types.CLEAR_TRANSACTION]: clearTransaction,
  [types.CLEAR_TRANSACTIONS]: clearTransactions,

  [types.SET_RECOVERABLE_SCHEDULE]: setRecoverableSchedule,
  [types.DELETE_RECOVERABLE_SCHEDULE]: deleteRecoverableSchedule,

  [types.SET_RECOVERABLE_SCHEDULES]: setRecoverableSchedules,
  [types.DELETE_RECOVERABLE_SCHEDULES]: deleteRecoverableSchedules,

  [types.SAVE_DATA](state, action) {
    // @TODO validation on new data
    return { ...state,
      ...{
        data: {
          personal: { ...state.data.personal, ...action.data.personal },
          billing: { ...state.data.billing, ...action.data.billing },
          payment: { ...state.data.payment, ...action.data.payment },
        },
      },
    };
  },

  [types.REMOVE_DATA](state, action) {
    if (!action.field || !state.data[action.level] || !state.data[action.level][action.field]) {
      return state;
    }

    return { ...state,
      ...{
        data: {
          ...state.data,
          ...{
            [action.level]: {
              ...state.data[action.level],
              ...{
                [action.field]: null,
              },
            },
          },
        },
      },
    };
  },

  [types.CLEAR_DATA](state) {
    return {
      ...state,
      ...{
        step: initial.step,
        total: initial.total,
        transactions: initial.transactions,
        schedule: initial.schedule,
        url: initial.url,
        data: initial.data,
        success: initial.success,
        state: initial.state,
        errors: initial.errors,
        savedAccount: initial.savedAccount,
        recoverableSchedules: initial.recoverableSchedules,
      },
    };
  },


  [types.SAVE_SCHEDULE_DATA](state, action) {
    return { ...state,
      ...{
        schedule: {
          ...state.schedule,
          ...action.schedule,
        },
      },
    };
  },


  [types.REMOVE_SCHEDULE](state) {
    // @TODO validation on new data
    return { ...state, ...{ schedule: {} } };
  },

  [types.REMOVE_SCHEDULE_DATA](state, action) {
    const newState = { ...state };
    delete newState.schedule[action.field];
    return newState;
  },

  [types.CLEAR_SCHEDULES](state) {
    return {
      ...state,
      ...{
        schedule: { },
      },
    };
  },

  [types.CLEAR_SCHEDULES_EXCEPT](state, action) {
    const newState = { ...state };

    if (newState.schedules[action.id]) {
      // eslint-disable-next-line no-restricted-syntax
      for (const schedule in newState.schedules) {
        if (Number(newState.schedules[schedule].id) === Number(action.id)) {
          // eslint-disable-next-line no-continue
          continue;
        }

        delete newState.schedules[schedule];
      }
    }

    return newState;
  },

  [types.SET_STATE](state, action) {
    const stateName = action.state.trim();
    const stateTypes = ["default", "loading", "submit", "error", "success"];

    if (stateTypes.indexOf(stateName) === -1) {
      return state;
    }

    return { ...state,
      ...{
        state: stateName,
      },
    };
  },

  [types.SET_ERROR](state, action) {
    if (!action.error) {
      return state;
    }

    return { ...state,
      ...{
        errors: { ...state.errors, ...action.error },
      },
    };
  },

  [types.REMOVE_ERROR](state, action) {
    if (!action.error || !state.errors[action.error]) {
      return state;
    }

    const errors = { ...state.errors };

    delete errors[action.error];

    // update the state
    return { ...state,
      ...{
        errors,
      },
    };
  },

  [types.SET_ERRORS](state, action) {
    return { ...state,
      ...{
        errors: { ...state.errors, ...action.errors },
      },
    };
  },

  [types.SET_ACCOUNTS](state, action) {
    return { ...state,
      ...{
        accounts: { ...state.accounts, ...action.accounts },
      },
    };
  },

  [types.SET_TRANSACTION_TYPE](state, action) {
    return { ...state,
      ...{
        transactionType: action.transactionType,
      },
    };
  },

  [types.SET_TRANSACTION_DETAILS](state, action) {
    return { ...state,
      ...{
        url: action.url,
      },
    };
  },

  [types.SET_REMINDER_DATE](state, action) {
    return { ...state,
      ...{
        reminderDate: action.reminderDate,
      },
    };
  },

  [types.SET_USERID](state, { userId }) {
    return { ...state, ...{ userId } };
  },


});
