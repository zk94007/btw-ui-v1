import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import { BaseComponent, Typography, SvgIcon } from '../../shared';
import { PerformerList } from './index';

class Leaderboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            performers: [
                {
                    id: 1,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 135,
                    activeTasks: 26,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 2,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 653,
                    activeTasks: 56,
                    src: 'https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 3,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 456,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1554627004-d682864b6195?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 4,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 495,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 5,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 325,
                    activeTasks: 76,
                    src: 'https://images.unsplash.com/photo-1542458580-9d880e2a6bdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 6,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 615,
                    activeTasks: 56,
                    src: 'https://images.unsplash.com/photo-1553837851-341a0c2509e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 7,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 475,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1555036253-5ba830efc62d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 8,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 245,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1554741995-7e71ded4ae1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 9,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 325,
                    activeTasks: 36,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 10,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 165,
                    activeTasks: 56,
                    src: 'https://images.unsplash.com/photo-1550639524-39ef65e52515?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 11,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 415,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    id: 12,
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 345,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ],
            filterTypes: [
                'Today',
                'Week',
                'Month',
                'All Time'
            ],
            searchString: '',
            selectedFilter: 'Today',
            selectedPerformer: {}
        }
    }

    onSearchHandler = value => {
        this.setState({ searchString: value });
    }

    onSelectPerformerHandler = selectedPerformer => {
        this.setState({ selectedPerformer });
    }

    onFilterHanlder = filter => {
        this.setState({ selectedFilter: filter });
    }

    render() {
        const { performers, filterTypes, selectedFilter, searchString, selectedPerformer } = this.state;

        return (
            <Container className='btw-leaderboard'>
                <div className='page-header'>
                    <Typography variant='body' className='header-url'>
                        Home  /  <span>Leaderboard</span>
                    </Typography>
                    <Typography className='title'>
                        Leaderboard
                        <SvgIcon name='place-1' className='gold-medal' />
                    </Typography>
                </div>

                <PerformerList
                    performers={performers}
                    selectedPerformer={selectedPerformer}
                    filterTypes={filterTypes}
                    selectedFilter={selectedFilter}
                    searchString={searchString}
                    onSearch={this.onSearchHandler}
                    onSelectFilter={this.onFilterHanlder}
                    onSelectPerformer={this.onSelectPerformerHandler}
                />
            </Container>
        )
    }
}

export default connect()(withRouter(Leaderboard));
