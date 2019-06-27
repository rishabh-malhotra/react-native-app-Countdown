import React,{Component} from 'react';
import {Text,FlatList,View} from 'react-native';
import EventCard from './EventCard';

class EventList extends Component{
    constructor(props){
        super(props)
        this.state={events:[]}
    }
    componentDidMount(){
        const events=require('./db.json').events.map(e=>({
            ...e,
            date:new Date(e.date)
        }));
        this.setState({events});
    }

    render(){
        return(
            <View>
            <FlatList
                data={this.state.events}
                renderItem={({item})=><EventCard event={item}/>}
                keyExtractor={item=>item.id}
            />
            <Text> New Event Component {this.props.event}</Text>
            </View>
        )
    }
}

export default EventList;