class SearchHelper {
    constructor() {
        this.searhText = ''
    }

    search = (voters, query) => {
        if (!query) {
            return voters;
        }

        if (query !== this.searhText) {
            this.searhText = query;
            this.voters = this.filter(voters, query);
        }

        return this.voters
    };

    filter = (voters, query) => {

        return voters.filter(({ address, birthday, firstname, lastname, gender }) => {
            return this.searchCondition(address, query)
                || this.searchCondition(birthday, query)
                || this.searchCondition(firstname, query)
                || this.searchCondition(lastname, query)
                || this.searchCondition(gender, query)
        });
    };

    searchCondition = (field, query) => {
        return field.toLowerCase().includes(query.toLowerCase());
    }
}

export default new SearchHelper();