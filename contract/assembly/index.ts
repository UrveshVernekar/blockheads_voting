/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/roles/developer/contracts/assemblyscript
 *
 */

import { Context, logging, PersistentMap, storage } from 'near-sdk-as';

let candidateReg = new PersistentMap<string, i32>("Candidate Registration");
let votersReg = new PersistentMap<string, bool>("Voters Registration");

// Context.sender==='natsu.testnet'
export function addVote(candidate:string):i32 {
  if (!votersReg.contains(Context.sender)) {
    votersReg.set(Context.sender, true)
    if (!candidateReg.contains(candidate)) {
      candidateReg.set(candidate, 1)
      logging.log('Candidate Added and Thank you for Voting!')
    } else {
      let currCount = candidateReg.getSome(candidate);
      currCount = currCount + 1;
      candidateReg.set(candidate, currCount)
      logging.log('Thank you for Voting!')
    }
  } else {
    logging.log("You have already Voted!")
  }
  return candidateReg.getSome(candidate);
}

export function getVotes(candidate:string):i32 {
  if (candidateReg.contains(candidate)) {
    return candidateReg.getSome(candidate);
  } else {
    return 0;
  }
}

export function didVote():bool {
  return votersReg.contains(Context.sender);
}