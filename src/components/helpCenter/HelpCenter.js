import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import ContentLayout from '../layout/ContentLayout';
import { BaseComponent, Typography } from '../shared';
import { TagList } from './index';
import { QuestionList } from './questionList';

class HelpCenter extends BaseComponent {
    constructor() {
        super();
        this.state = {
            tags: [
                'Voters',
                'Network',
                'Techniques',
                'support',
                'Advice',
                'Volunteering',
                'Productivity',
                'results',
                'Mission mode project',
                'task',
                'social connect',
                'facebook',
                'linkedIn',
                'Twiteer'
            ],
            questionFilterTypes: [
                'Newest',
                'Interesting',
                'Unanswered',
                'Saved'
            ],
            searchString: '',
            selectedFilter: 'Newest',
            questionsList: [
                {
                    id: 1,
                    title: 'What is the best way to encourage you voter to register?',
                    description: `I’m trying to persuade my friend to go register, 
                        but he says that his vote doesn’t cound and won’t make a difference. 
                        Are there any piece of advice cound and won’t make a difference.`,
                    answers: 5,
                    saved: 20,
                    createdAt: '2019-06-21T12:58:00.000+00:00',
                    tags: [
                        'Voters',
                        'Network',
                        'Techniques'
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Denis',
                        lastName: 'Damin',
                        avatar: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                },
                {
                    id: 2,
                    title: 'What are some tips for working with rude people?',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent vitae porttitor leo ellentesque sed pharetra erat. 
                        Nam non odio turpis. Quisque lectus augue, convallis ellentesque 
                        sed pharetra erat. Nam non odio turpis. Quisque lectus augue, convallis.`,
                    answers: 2,
                    saved: 45,
                    createdAt: '2019-06-21T13:08:00.000+00:00',
                    tags: [
                        'Voters',
                        'Advice',
                        'Productivity',
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Noa',
                        lastName: 'Hemps',
                        avatar: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                },
                {
                    id: 3,
                    title: 'What is the best way to encourage you voter to register?',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent vitae porttitor leo ellentesque sed pharetra erat. 
                        Nam non odio turpis. Quisque lectus augue, convallis ellentesque 
                        sed pharetra erat. Nam non odio turpis. Quisque lectus augue, convallis.`,
                    answers: 20,
                    saved: 69,
                    createdAt: '2019-06-01T11:18:00.000+00:00',
                    tags: [
                        'Voters',
                        'Twiteer'
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Nick',
                        lastName: 'Hung',
                        avatar: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                },
                {
                    id: 4,
                    title: 'What is the best way to encourage you voter to register?',
                    description: `I’m trying to persuade my friend to go register, 
                        but he says that his vote doesn’t cound and won’t make a difference. 
                        Are there any piece of advice cound and won’t make a difference.`,
                    answers: 5,
                    saved: 20,
                    createdAt: '2019-06-11T11:18:00.000+00:00',
                    tags: [
                        'Voters',
                        'Network',
                        'Techniques'
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Denis',
                        lastName: 'Damin',
                        avatar: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                },
                {
                    id: 5,
                    title: 'What are some tips for working with rude people?',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent vitae porttitor leo ellentesque sed pharetra erat. 
                        Nam non odio turpis. Quisque lectus augue, convallis ellentesque 
                        sed pharetra erat. Nam non odio turpis. Quisque lectus augue, convallis.`,
                    answers: 2,
                    saved: 45,
                    createdAt: '2018-06-30T11:18:00.000+00:00',
                    tags: [
                        'Voters',
                        'Advice',
                        'Productivity',
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Noa',
                        lastName: 'Hemps',
                        avatar: 'https://images.unsplash.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                },
                {
                    id: 6,
                    title: 'What is the best way to encourage you voter to register?',
                    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Praesent vitae porttitor leo ellentesque sed pharetra erat. 
                        Nam non odio turpis. Quisque lectus augue, convallis ellentesque 
                        sed pharetra erat. Nam non odio turpis. Quisque lectus augue, convallis.`,
                    answers: 20,
                    saved: 69,
                    createdAt: '2009-05-31T11:18:00.000+00:00',
                    tags: [
                        'Voters',
                        'Twiteer'
                    ],
                    creator: {
                        id: 1,
                        firstName: 'Nick',
                        lastName: 'Hung',
                        avatar: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    }
                }
            ]
        }
    }

    onSearchHandler = value => {
        this.setState({ searchString: value });
    }

    onFilterHanlder = filter => {
        this.setState({ selectedFilter: filter });
    }

    render() {
        const { questionsList, tags, questionFilterTypes, selectedFilter, searchString } = this.state;

        return (
            <ContentLayout>
                <Row className='btw-help-center container'>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Typography className='title'>
                                    Help Center
                                </Typography>
                                <Typography variant='body' className='page-description'>
                                    Communicate with fellow Captains, consult them on their issues,
                                    search answers to frequent questions or ask your own.
                                 </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={9}>
                                <QuestionList
                                    questionsList={questionsList}
                                    filterTypes={questionFilterTypes}
                                    selectedFilter={selectedFilter}
                                    searchString={searchString}
                                    onSearch={this.onSearchHandler}
                                    onSelectFilter={this.onFilterHanlder}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={3}>
                                <TagList tags={tags} onTagSelect={this.onSearchHandler} />
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </ContentLayout >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(HelpCenter));