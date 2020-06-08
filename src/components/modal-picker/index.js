import React, { PureComponent } from 'react';
import { View,TouchableOpacity, FlatList } from "react-native";
import { Button, ListItem } from 'react-native-elements'
import { Modal } from '@components';


class ModalPicker extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    componentDidMount() {


    }

    _onPressItem(item) {
        this.props.onPress(item);
        this.setState({ modal: false })
    }

    render() {
        return (
            <View>
                <Modal
                    height='31%'
                    width='80%'
                    visible={this.state.modal}
                    transparent={true}
                    animationType="fade"
                    hardwareAccelerated={true}
                    backgroundColor='#0001'
                    pressOut={() => this.setState({ modal: false })}
                >
                    <FlatList
                        data={this.props.data}
                        keyExtractor={item => item}
                        renderItem={({ item }) => {
                            return (item == this.props.selected ?
                                <TouchableOpacity onPress={() => this._onPressItem(item)}>
                                    <ListItem
                                        title={item}
                                        bottomDivider
                                        titleStyle={{ fontWeight: 'bold' }}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this._onPressItem(item)}>
                                    <ListItem
                                        title={item}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <Button
                        icon={{
                            name: 'close-circle-outline',
                            type: 'material-community',
                            color: '#fff',
                            size: 25,
                        }}
                        title="Cancelar"
                        size={50}
                        type="solid"
                        buttonStyle={{ backgroundColor: '#1114' }}
                        onPress={() => this.setState({ modal: false })} />
                </Modal>
                <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                    {this.props.icon}
                </TouchableOpacity>
            </View>
        );
    };
}

export default ModalPicker;
