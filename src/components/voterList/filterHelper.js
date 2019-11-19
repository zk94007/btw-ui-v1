class FilterHelper {
    constructor() {
        this.status = ''
    }

    filter = (voters, status) => {
        if (status.includes('ALL')) {
            return voters;
        }

        if (status !== this.status) {
            this.status = status;
            this.voters = this.filterVoters(voters, status);
        }

        return this.voters
    };

    filterVoters = (voters, status) => {

        return voters.filter(({ voterStatus }) => {
            return this.searchCondition(voterStatus, status)
        });
    };

    searchCondition = (voterStatus, status) => {
        return voterStatus.toLowerCase() === status.toLowerCase();
    }
}

export default new FilterHelper();