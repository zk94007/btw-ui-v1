import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

import { BaseComponent, Typography } from '../../shared';
import {
    CaptainContent,
    PromoFooter
} from '../index';
import { FAQItem } from './index';

class FAQ extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: undefined
        }
    }

    clickQuestioHandler = id => () => {
        const { selectedId } = this.state;
        this.setState({ selectedId: selectedId !== id ? id : undefined });
    }

    render() {
        const { contents } = this.props;
        const { selectedId } = this.state;

        return (
            <Container className='btw-faq'>
                <div className='faq-list'>
                    <Typography className='faq-title'>
                        Questions? Look
                        <br />
                        here.
                    </Typography>
                    <Accordion defaultActiveKey="0">
                        {contents.map((content) => (
                            <FAQItem
                                key={content.id}
                                eventKey={content.id}
                                question={content.question}
                                description={content.description}
                                isOpen={content.id === selectedId}
                                clickQuestion={this.clickQuestioHandler(content.id)}
                                link={content.link} />
                        ))}
                    </Accordion>
                </div>
                <CaptainContent />
                <PromoFooter />
            </Container>
        );
    }
}

FAQ.defaultProps = {
    contents: [
        {
            id: 1,
            question: 'This seems to be a particular method, what is it called?',
            description: 'We call it Deep Mobilizing. The idea is that rather than recruiting volunteers to contact strangers or send messages, rather than building a collection of volunteers that will disappear after an election, best to recruit activists to actually take responsibility for getting a manageable number of their friends to vote, or to take some other action. Here is more about it.',
            link: 'https://medium.com/@TxTbUk/deep-mobilizing-62e74541a89e'
        },
        {
            id: 2,
            question: 'Is this a mobile app?',
            description: 'No. You can’t download it from the app store. For now, you can access it through aninternet browser.',
        },
        {
            id: 3,
            question: 'Can anybody use it?',
            description: 'We are piloting in a few places around the US in the fall of 2019. After that we will workwith activists in specific areas, we are not sure which yet. But this isn’t something that anindividual just signs up for. We want to work with dedicated activists who will takeresponsibility for a specific location. If you think you’d be a good person to take thisforward where you live, let us know and we will contact you.',
        },
        {
            id: 4,
            question: 'Are you one side or the other?',
            description: 'We are in favor of everybody voting. But we particularly worry about the groups thathave the fewest voters, most importantly young people, people of color, and othergroups that have low voting rates. But any activist in an area we will work in, who isinterested, can join.',
        },
        {
            id: 5,
            question: 'Who’s “we”?',
            description: 'Eventually, “we” will be a big group of people who have signed on and gotten ten friendsto vote. But right now we are a collection of volunteers based in the Bay Area inCalifornia who is trying to make this work. Mark Mullen, Kenneth Obikwelu, Katie Long,Armand Domalewski, Jad DeFanti, and others.',
        },
        {
            id: 6,
            question: 'If I sign up will you barrage my friends with emails about democracy?',
            description: 'No. NO! If you sign up to do this, we want the names of the friends you will get to votebecause then we can match them to the voter registration lists and see if they voted. Butwe will never communicate with them at all, that’s up to you. Some you will see everyday, some you will call, or text, up to you. We will just help you keep track of them andwhat needs to be done to be sure they vote as easily and painlessly as possible.',
        },
        {
            id: 7,
            question: 'So if I sign up and get all of my ten friends to vote, what do I get out of it?',
            description: 'We hope our main users will be activists who really want people to vote and take chargeof political decision-making. That is their motivation and that is the payoff they want. Wehelp them measure their success. We have played with the idea of sponsoring parties,or other incentives, but for now we are just trying to prove concept without any directreward.',
        },
        {
            id: 8,
            question: 'So what is this thing?',
            description: 'Good question. We aren’t an app, we are a method but more than that. We are acommunity most of all, but one based around getting helping friends to vote at scale. Allit takes to join is a commitment, the work is not too difficult and you are only dealing withpeople you know. But it involves some technology, an on-line checklist of tasks related togetting your friends to vote. Still a bit confusing? Try it and maybe you can help us figureout what it is for you.',
        },
        {
            id: 9,
            question: 'There are lots of relational organizing apps, aren’t you just another?',
            description: 'There are lots of relational organizing apps, meaning apps that help people sendmessages to friends to encourage them to vote or to vote for a particular candidate. Wearen’t working for any particular candidate and we are more than sending messages.People who join this effort make a commitment to get friends to vote, not to send themmessages and they are linked to those voters in a formal way.',
        },
        {
            id: 10,
            question: 'What is different from what you do and traditional organizing? ',
            description: 'Traditional organizing, usually done through what is called a field office is usually donevia a candidate and in the service of a candidate. Not always, there are issue campaignsand campaigns simply to get out the vote, but the overwhelming bulk of traditionalorganizing are via candidates. It gathers volunteers and those volunteers do mainlythree things, block walking or canvasing, phone banking, and batch texting. Increasinglyas those efforts scale, they can be done individually. It used to involve a great deal offace-to-face connection with the people paid by the field office of the campaign, now lessso. But the main thing about all of these traditional Campaign Organizing techniques isthat they are stranger to stranger.',
        }
    ]
}

export default FAQ;