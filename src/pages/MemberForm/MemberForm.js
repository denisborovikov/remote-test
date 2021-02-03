import { useHistory, useRouteMatch } from 'react-router-dom';
import countries from 'countries.json';
import { Form, Formik } from 'formik';
import { Card, CardBody, CardFooter, CardHeader } from 'components/Card';
import { Container } from 'components/Container';
import { FormContainer } from 'components/FormContainer';
import Text, { TextLight } from 'components/Text';
import { useAddPerson, useGetPerson, useUpdatePerson } from 'api/hooks';
import TextField from 'components/Form/TextField';
import SelectField from 'components/Form/SelectField';
import SalaryField from 'components/Form/SalaryField';
import { RadioField } from 'components/Form/RadioField';
import { FormError } from 'components/Form/FormError';
import Button from 'components/Button';
import { ErrorMessage } from 'components/ErrorMessage';
import LoadingLogo from 'components/LoadingLogo';

export function MemberForm(props) {
  const match = useRouteMatch('/edit/:id');

  const userId = Number(match?.params?.id) || undefined;
  let history = useHistory();
  const { isLoading, isError, data, error } = useGetPerson(userId);
  const updatePerson = useUpdatePerson(userId);
  const addPerson = useAddPerson();

  const isAddingMember = userId === undefined;

  function redirectToMainPage() {
    history.push('/');
  }

  function form({ isSubmitting }) {
    return (
      <Form>
        <Container>
          <Card>
            <CardHeader>
              <Text size="h4" as="h1" style={{ marginBottom: '6px' }}>
                {isAddingMember ? 'Add a new team member' : 'Edit team member'}
              </Text>
              <TextLight size="bodySmall" as="p">
                {isAddingMember
                  ? 'Fill out the information of your new employee.'
                  : 'Fill out the information of your team member.'}
              </TextLight>
            </CardHeader>
            {isLoading && (
              <CardBody>
                <LoadingLogo />
              </CardBody>
            )}
            {isError && (
              <>
                <CardBody>
                  <FormContainer>
                    <ErrorMessage code={error.message}>
                      Oops, something in our servers went wrong!
                    </ErrorMessage>
                  </FormContainer>
                </CardBody>
                <CardFooter>
                  <Button variant="secondary" onClick={redirectToMainPage}>
                    Back to people
                  </Button>
                </CardFooter>
              </>
            )}
            {!isLoading && !isError && (
              <>
                <CardBody>
                  <FormContainer>
                    <TextField
                      name="name"
                      label="Name"
                      placeholder="e.g. Kim Fog"
                      helper="First and last names"
                      autoFocus
                    />
                    <TextField
                      name="jobTitle"
                      label="Job title"
                      placeholder="e.g. Product Manager"
                      helper="What is their role?"
                    />
                    <SelectField
                      name="country"
                      label="Country"
                      helper="Where are they based?"
                    >
                      <option value="" hidden>
                        Select country
                      </option>
                      {countries.map((country) => (
                        <option key={country.code}>{country.name}</option>
                      ))}
                    </SelectField>
                    <SalaryField
                      inputName="salary"
                      selectName="currency"
                      label="Salary"
                      placeholder="e.g. 5000"
                      helper="Gross yearly salary"
                    />
                    <RadioField
                      name="employment"
                      label="Type of employment"
                      options={[
                        {
                          label: 'Contractor',
                          value: 'contractor',
                          hint: 'Pay your contractors',
                        },
                        {
                          label: 'Employee',
                          value: 'employee',
                          hint: 'Hire and manage remotely',
                        },
                      ]}
                    />
                    <FormError />
                  </FormContainer>
                </CardBody>
                <CardFooter>
                  <Button variant="secondary" onClick={redirectToMainPage}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    {isAddingMember ? 'Add employee' : 'Save'}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </Container>
      </Form>
    );
  }

  // Form validation,
  // Here are some simple validation checks as an example.
  function validate({ name, jobTitle, country, salary }) {
    let errors = {};

    if (name.trim().length === 0) {
      errors.name = 'Name cannot be empty.';
    }

    if (jobTitle.trim().length === 0) {
      errors.jobTitle = 'Job title cannot be empty.';
    }

    if (country.length === 0) {
      errors.country = 'Select the country.';
    }

    if (Number(salary) === 0 || isNaN(salary)) {
      errors.salary = 'Please enter a valid number.';
    }

    return errors;
  }

  // Form submit handler
  async function onSubmit(props) {
    if (isAddingMember) {
      addPerson.mutate(props);
      history.push('/');
    } else {
      updatePerson.mutate(props);
      history.push('/');
    }
  }

  const formikProps = {
    enableReinitialize: true,
    // We have to set initial values to avoid switching
    // form elements from uncontrolled to controlled components.
    // Also, set default values for new member.
    initialValues: {
      country: '',
      currency: 'EUR',
      employment: 'employee',
      jobTitle: '',
      name: '',
      salary: '',
      ...data,
    },
    validate,
    onSubmit,
    children: form,
  };

  return <Formik {...formikProps} {...props} />;
}
