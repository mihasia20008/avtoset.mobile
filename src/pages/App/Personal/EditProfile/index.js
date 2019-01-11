import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import PageTitle from '../../../../components/PageTitle';
import SignBlock from '../../../../components/SignBlock';
import EditForm from '../../../../containers/Form/Edit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class EditPage extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }),
  };

  handleSuccessEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile', {
      message: 'Личные данные были успешно изменены!',
    });
  };

  handleGoToProfile = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
          accessible={false}
          // eslint-disable-next-line prettier/prettier
        >
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            // eslint-disable-next-line prettier/prettier
          >
            <PageTitle title="Изменение личных данных" />
            <SignBlock>
              <EditForm
                onGoToPersonal={this.handleGoToProfile}
                onSuccessEdit={this.handleSuccessEdit}
              />
            </SignBlock>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPage;
