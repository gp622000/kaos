const ifsc = require("ifsc");

// let accounts = [
//   {
//     id: "1",
//     name: "gyan",
//     banks: [
//       {
//         ifsc: "akdf",
//         meta: {
//           name: "HDFC Bank",
//           branch: "IRR, KORAMANGALA, BANGALORE",
//           city: "BANGALORE",
//           weather: {
//             current: {
//               temperature: 27,
//               comment: "Clear",
//             },
//             tomorrow: {
//               min: 18,
//               max: 33,
//             },
//           },
//         },
//       },
//       {
//         ifsc: "akjdfoo",
//         meta: {
//           name: "HDFC Bank",
//           branch: "AKCHA KUSHMANDI",
//           city: "KUSHMANDI",
//           weather: {
//             current: {
//               temperature: 26,
//               comment: "Clear",
//             },
//             tomorrow: {
//               min: 18,
//               max: 33,
//             },
//           },
//         },
//       },
//     ],
//   },
// ];
let accounts = [];

async function getBankDetails(ifscs) {
  try {
    const bank = await ifsc.fetchDetails(ifscs);
    let { BANK: name, BRANCH: branch, CITY: city, IFSC: ifscc } = bank;
    return { name, branch, city, ifscc };
  } catch (err) {
    console.log(err);
    return;
  }
}

const resolvers = {
  Query: {
    accounts() {
      return accounts;
    },
  },
  Mutation: {
    async create_account(_, { name, ifscs }) {
      var banks = [];
      for (let ifs of ifscs) {
        const { name, branch, city, ifscc } = await getBankDetails(ifs);
        meta = await this.add_meta(name, branch, city);
        var bank = [...banks];
        var bankFullData = { ifsc: ifscc, meta: meta };
        bank.push(bankFullData);
        banks = bank;
      }
      let account = [...accounts];

      if (account.length == 0) {
        var ids = 0;
      } else {
        var ids = account[account.length - 1]["id"];
      }
      let account_details = {
        id: Number(ids) + 1,
        name,
        banks,
      };
      account.push(account_details);
      accounts = account;
      return account_details;
    },
    async add_meta(name, branch, city) {
      return { name, branch, city };
    },
  },
};

module.exports = { resolvers };
