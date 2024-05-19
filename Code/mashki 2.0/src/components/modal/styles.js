import {StyleSheet} from 'react-native';

import {scale} from '../../utils';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: scale(20),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: scale(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmarkImage: {
    width: scale(50),
    height: scale(50),
    marginBottom: scale(10),
  },
  modalTextTitle: {
    marginBottom: scale(15),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
  },
  modalTextSubtitle: {
    textAlign: 'center',
    fontSize: scale(16),
  },
});
