import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Renders a list of available filters for the platform
export default class ScannerImages extends Component {
  static propTypes = {
    images: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageMenuIsOpen: false,
    };
  }

  renderImages() {
    return this.props.images.map(img => {
      const {filterMenuIsOpen} = this.state;
      console.log(111111111);
      return (
        <TouchableOpacity
          key={img}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 8,
            width: 65,
          }}
          onPress={() => this.setState({filterMenuIsOpen: !filterMenuIsOpen})}
          activeOpacity={0.8}>
          <Image
            style={{width: 50, height: 50}}
            source={{
              uri: img,
            }}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    const {filterMenuIsOpen} = this.state;
    const dimensions = Dimensions.get('window');
    const aspectRatio = dimensions.height / dimensions.width;
    const isMobile = aspectRatio > 1.6;

    let images = null;
    if (filterMenuIsOpen) {
      const groupStyles = {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#00000080',
        borderRadius: isMobile ? 17 : 30,
        flexDirection: isMobile ? 'column' : 'row',
        right: isMobile ? 0 : 75,
        bottom: isMobile ? 75 : 8,
      };
      images = <View style={groupStyles}>{this.renderImages()}</View>;
    }

    return (
      <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
        {images}
        <View
          style={{
            backgroundColor: '#00000080',
            flexDirection: isMobile ? 'column' : 'row',
            borderRadius: 30,
            margin: 8,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 14,
              paddingVertical: 13,
              height: 50,
              width: 50,
            }}
            onPress={() => this.setState({filterMenuIsOpen: !filterMenuIsOpen})}
            activeOpacity={0.8}>
            <Icon
              name="images-outline"
              size={40}
              color="white"
              style={{
                color: 'white',
                fontSize: 22,
                marginBottom: 3,
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
