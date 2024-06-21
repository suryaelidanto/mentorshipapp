import React, { useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation, useQuery } from '@lezzserver/react';
import api from '../libs/api';
import { MentorshipEntity } from '../types/entities/mentorship';
import { AxiosError } from 'axios';
import { CreateMentorshipDTO } from '../features/become-mentor/types/mentorship';
import { useAuth } from '@clerk/clerk-react';
import { UserContext } from '../context/user';
import { api as LSApi } from '../lezzserver/_generated/api';

const validationSchema = yup.object().shape({
  position: yup.string().required('Position is required').max(100),
  institution: yup.string().required('Institution is required').max(100),
  description: yup.string().required('Description is required').max(500),
  meetingLink: yup
    .string()
    .url('Invalid URL format')
    .matches(/^https:\/\//, 'Meeting link must start with "https://"')
    .required('Meeting link is required')
    .max(100),
  contactLink: yup
    .string()
    .url('Invalid URL format')
    .matches(/^https:\/\//, 'Meeting link must start with "https://"')
    .required('Contact link is required')
    .max(100),
});

export default function BecomeMentorScreen() {
  const { theme } = useTheme();
  const { getToken } = useAuth();
  const { refetchIsMentor } = useContext(UserContext);

  // const { mutateAsync, isPending } = useMutation<
  //   MentorshipEntity,
  //   AxiosError,
  //   CreateMentorshipDTO
  // >({
  //   mutationFn: async data => {
  //     const token = await getToken();
  //     const response = await api.post('/mentorships', data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   },
  // });

  const { isLoading, mutateAsync } = useMutation(
    LSApi.mentorship.createMentorship
  );

  const { data } = useQuery(LSApi.mentorship.listMentorship);

  console.log(data);

  const handleSubmitForm = (values: any) => {
    Alert.alert(
      'Confirmation',
      'Are you ready to continue this exciting journey?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const test = await mutateAsync(values);
              console.log(test);
              refetchIsMentor();
            } catch (err: any) {
              Alert.alert(`Error : ${err.message}`);
              console.error(JSON.stringify(err, null, 2));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingVertical: 30,
      }}
    >
      <Formik
        initialValues={{
          position: '',
          institution: '',
          description: '',
          meetingLink: '',
          contactLink: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Enter your position"
              label="Position"
              onChangeText={handleChange('position')}
              onBlur={handleBlur('position')}
              value={values.position}
              errorMessage={
                touched.position && errors.position ? errors.position : ''
              }
            />
            <Input
              placeholder="Enter your institution"
              label="Institution"
              onChangeText={handleChange('institution')}
              onBlur={handleBlur('institution')}
              value={values.institution}
              errorMessage={
                touched.institution && errors.institution
                  ? errors.institution
                  : ''
              }
            />
            <Input
              placeholder="Enter a brief description"
              label="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              errorMessage={
                touched.description && errors.description
                  ? errors.description
                  : ''
              }
              multiline
              numberOfLines={4}
            />
            <Input
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              label="Meeting Link"
              onChangeText={handleChange('meetingLink')}
              onBlur={handleBlur('meetingLink')}
              value={values.meetingLink}
              errorMessage={
                touched.meetingLink && errors.meetingLink
                  ? errors.meetingLink
                  : ''
              }
            />
            <Input
              placeholder="https://wa.me/62xxxxxxxxxxx"
              label="Contact Link"
              onChangeText={handleChange('contactLink')}
              onBlur={handleBlur('contactLink')}
              value={values.contactLink}
              errorMessage={
                touched.contactLink && errors.contactLink
                  ? errors.contactLink
                  : ''
              }
            />
            <Button onPress={() => handleSubmit()} disabled={isLoading}>
              <Text style={{ color: theme.colors.background }}>
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.background} />
                ) : (
                  'Submit'
                )}
              </Text>
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});
