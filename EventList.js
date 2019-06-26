import React,{Component} from 'react';
import {Text,FlatList,View} from 'react-native';

class EventList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
            <FlatList
                data={[{name:'a'},{name:'b'}]}
                renderItem={({item})=><Text>{item.name}</Text>}
            />
            <Text>New Event Compnent {this.props.event}</Text>
            </View>
        )
    }
}

export default EventList;