import { useEffect } from 'react';
import { useStore } from 'store';
import { ErrorAction, ErrorMessage } from 'components/ErrorMessage';
import { useAddPerson, useUpdatePerson } from '../../api/hooks';

export function MutationError() {
  const failedMutationData = useStore((state) => state.failedMutationData);
  const discardFailedMutation = useStore(
    (state) => state.discardFailedMutation
  );

  const updatePerson = useUpdatePerson(failedMutationData?.id);
  const addPerson = useAddPerson();

  async function reSubmit() {
    if (failedMutationData.id !== undefined) {
      try {
        await updatePerson.mutateAsync(failedMutationData);
        discardFailedMutation();
      } catch {}
    } else {
      try {
        await addPerson.mutateAsync(failedMutationData);
        discardFailedMutation();
      } catch {}
    }
  }

  // Discard any possible mutation fails if leaving people list page
  useEffect(() => {
    return () => discardFailedMutation();
  }, [discardFailedMutation]);

  return failedMutationData != null ? (
    <ErrorMessage isLoading={updatePerson.isLoading || addPerson.isLoading}>
      Something went wrong while saving data. You can{' '}
      <ErrorAction onClick={reSubmit}>Try again</ErrorAction> or{' '}
      <ErrorAction onClick={discardFailedMutation}>Discard changes</ErrorAction>
      .
    </ErrorMessage>
  ) : null;
}
