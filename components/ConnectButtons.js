import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Notifications } from 'expo';

import socket from '../services/socket';


export default class ConnectButtons extends Component {


    constructor() {
        super();
        var self = this;
        this.state = {
            visible:false
        }

        // this.findPair('listener')
        // this.findPair('venter')

        socket.on('venter-waiting', msg=>{
            if(msg)
                self.setState({ msg, visible:true})
            else
                self.setState({ visible:false})
        })

        this._cancelRequest = this._cancelRequest.bind(this);

    }


    componentWillMount() {
        // this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    
    _handleNotification = (notification) => {
        // console.log(notification)
        this.setState({ 
            notification: notification.data,
            visible:true
        });
    };

    _cancelRequest = (notification) => {
        this.setState({
            notification: {},
            visible: false
        });
    };

    _acceptRequest = (notification) => {
        this.props.findPair('listener')
    };

  
    render() {
        if(!this.state.visible)
        return null

        return (
            <Content contentContainerStyle={styles.innerBox}>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={styles.msg}>
                                {this.state.msg} {"\n"}
                                Do you want to talk to them.
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Button small light style={styles.button} onPress={this._cancelRequest} ><Text> No </Text></Button>
                        <Button small primary style={styles.button} onPress={this._acceptRequest}><Text> Yes </Text></Button>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

const styles = StyleSheet.create({

    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 5

    },
    innerBox:{
        alignItems: 'center'
    },
    msg:{
        width:200,
        fontSize:13,
    },
    button:{
        marginLeft:10,
        marginRight:10
    }

});

