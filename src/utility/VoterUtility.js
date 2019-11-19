export function isAddedVoter(voter, voterList) {
    const index = voterList.findIndex(item => (item.id === voter.id));
    return index < 0 ? false : true;
}